import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ReactJson from 'react18-json-view'
import 'react18-json-view/src/style.css'
import { Button, Card, Col, Input, InputNumber, Layout, Modal, Row, Spin } from 'antd';

import CxxToken from '../../build/CxxToken.json';

const { Content } = Layout;

function WalletHome() {
  // console.log(import.meta.env)
  const {
    VITE_REACT_APP_CONTARCT_ADDRESS,
    VITE_REACT_APP_DEPLOYER,
    VITE_REACT_APP_DEPLOYER_PRIVATE_KEY,
    VITE_REACT_APP_RECIVER,
    VITE_REACT_APP_RECIVER_PRIVATE_KEY
  } = import.meta.env

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({});

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');

  const [supply, setSupply] = useState('');
  const [ownerBlance, setOwnerBlance] = useState('');
  const [ownerWalletBlance, setOwnerWalletBlance] = useState('');

  const [reciverBlance, setReciverBlance] = useState('');

  const [number, setNumber] = useState(0);
  const [address, setAddress] = useState(VITE_REACT_APP_RECIVER)

  const [txs, setTxs] = useState({})

  const [eventList, setEventList] = useState([]);

  let provider = new ethers.JsonRpcProvider("http://localhost:8545")
  let wallet = new ethers.Wallet(VITE_REACT_APP_DEPLOYER_PRIVATE_KEY, provider);
  let contract = new ethers.Contract(VITE_REACT_APP_CONTARCT_ADDRESS, CxxToken.abi, provider) // Read-Only
  // let contractRW = new ethers.Contract(VITE_REACT_APP_CONTARCT_ADDRESS!, FoolToken.abi, wallet) // Read-Write
  let contractWithSigner = contract.connect(wallet);

  // 合约名称
  async function getName() {
    setName(await contractWithSigner.name());
  }

  // 合约符号
  async function getSymbol() {
    setSymbol(await contractWithSigner.symbol());
  }

  // Decimals
  async function getDecimals() {
    setDecimals(await contractWithSigner.decimals());
  }

  // 合约总供应量
  async function getSupply() {
    setSupply(await contractWithSigner.totalSupply().then((balance) => ethers.formatEther(balance)))
  }

  // owner 余额
  async function getOwnerBalance() {
    setOwnerBlance(await contractWithSigner.balanceOf(VITE_REACT_APP_DEPLOYER).then((balance) => ethers.formatEther(balance)))
  }

  // owner eth 余额
  async function getOwnerWalletBalance() {
    // setOwnerWalletBlance(await wallet.getBalance().then((balance) => ethers.utils.formatEther(balance)))
    let balance = await provider.getBalance(VITE_REACT_APP_DEPLOYER).then((balance) => ethers.formatEther(balance))
    setOwnerWalletBlance(balance)
  }

  // reciver 余额
  async function getReciverBalance() {
    setReciverBlance(await contractWithSigner.balanceOf(VITE_REACT_APP_RECIVER).then((balance) => ethers.formatEther(balance)))
  }

  // 查询数据
  const refetch = () => {
    getName()
    getSymbol()
    getDecimals()

    getSupply()
    getOwnerBalance()
    getReciverBalance()

    getOwnerWalletBalance()
    getAddressTransfers();
  }

  // 发币
  const sendToken = async () => {
    let numberOfTokens = ethers.parseUnits(number.toString(), 18);
    console.log(`numberOfTokens: ${numberOfTokens}`);
    estimateAndShowGasCost('transfer', address, numberOfTokens)
  }

  const confirmSendToken = async () => {
    setLoading(true);
    let numberOfTokens = ethers.parseUnits(number.toString(), 18);
    console.log(`numberOfTokens: ${numberOfTokens}`);

    const transaction = await contractWithSigner.transfer(address, numberOfTokens);
    await transaction.wait();
    console.log(`${number} Tokens successfully sent to ${address}`);
    setLoading(false)
    refetch()
  }
  // 同时设置 Gas Limit 和 Gas 价格
  const setupGasOptions = async (functionName, ...args) => {
    const feeData = await provider.getFeeData();
    const estimatedGas = await contract[functionName].estimateGas(...args);
    const gasLimit = estimatedGas * BigInt(12) / BigInt(10);
    return {
      gasLimit: gasLimit,
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
    }
  }

  const estimateAndShowGasCost = async (functionName, ...args) => {
    try {
      // 1. 估算 gas 使用量
      const gasEstimate = await contractWithSigner[functionName].estimateGas(...args);

      // 2. 获取当前 gas 价格
      // You should use (await provider.getFeeData()).gasPrice.
      // Keep in mind only legacy networks have/use a gasPrice; 
      // modern EIP-1559 networks instead use maxFeePerGas and maxPriorityFeePerGas.
      const gasPrice = (await provider.getFeeData()).gasPrice

      // 3. 计算总的 gas 成本
      const gasCost = gasEstimate * gasPrice;

      // 4. 将 wei 转换为 ether
      const gasCostEther = ethers.formatEther(gasCost);

      // 7. 使用 antd Modal 显示结果
      Modal.confirm({
        title: '估算的 Gas 费用',
        content: (
          <div>
            <p>估算的 Gas 使用量: {gasEstimate.toString()} 单位</p>
            <p>当前 Gas 价格: {ethers.formatUnits(gasPrice, 'gwei')} Gwei</p>
            <p>总 Gas 成本: {gasCostEther} ETH</p>
          </div>
        ),
        onOk() {
          // 这里可以添加确认后的逻辑，比如执行实际的交易
          console.log('用户确认了交易');
          confirmSendToken()
        },
        onCancel() {
          console.log('用户取消了交易');
        },
      });
    } catch (error) {
      Modal.error({
        title: '估算 Gas 费用失败',
        content: '无法估算 Gas 费用: ' + error.message,
      });
    }
  }

  // 交易信息callback
  const onContractTransfer = (from, to, value, event) => {
    console.log('txs', txs)
    console.log(event)
    const { transactionHash } = event.log
    if (!txs[transactionHash]) {
      console.log(transactionHash, ethers.formatUnits(value), new Date().getTime());
      setTxs({
        ...txs, [transactionHash]: {
          from,
          to,
          value: ethers.formatUnits(value),
          transactionHash: transactionHash
        }
      })
    }
  }

  // 点击交易hash显示交易详情
  const showTxDetail = async ({ name, value }) => {
    if (name === "transactionHash") {
      const tx = await provider.getTransaction(value)
      setModal({
        hash: value,
        data: tx
      })
    }
  }

  // 点击交易hash显示交易详情
  const showTranstionDetail = async ({ transactionHash }) => {
    const tx = await provider.getTransaction(transactionHash)
    setModal({
      hash: transactionHash,
      data: tx
    })
  }

  const filterEvent = async () => {
    const filter = contract.filters.Transfer();
    const events = await contract.queryFilter(filter, startBlock, endBlock);
  }

  // 获取地址的event 历史
  async function getAddressTransfers() {
    const address = VITE_REACT_APP_DEPLOYER
    const filter = contractWithSigner.filters.Transfer(address, null);
    // 查询最近 10000 个区块
    const currentBlock = await provider.getBlockNumber();
    let fromBlock = currentBlock - 10000;
    if (fromBlock < 0) fromBlock = 0
    const events = await contractWithSigner.queryFilter(filter, fromBlock, currentBlock);

    const eventList = events.map(event => {
      if (event.args[0].toLowerCase() === address.toLowerCase()) {
        console.log(`${address} sent ${event.args.value} tokens to ${event.args.to}`);
        return `${address} sent ${event.args.value} tokens to ${event.args.to}`
      } else {
        console.log(`${address} received ${event.args.value} tokens from ${event.args.from}`);
        return `${address} received ${event.args.value} tokens from ${event.args.from}`;
      }
    });
    setEventList(eventList)
  }

  useEffect(() => {
    refetch()
    contractWithSigner.on('Transfer', onContractTransfer)
    // contractWithSigner.on('transfer', () => {
    //   console.log(from, to, value, )
    // })
    contract.on('Transfer', (from, to, value, event) => {
      console.log(from, to, value, event)
    })
    // contract.on('transfer', () => {
    //   console.log(from, to, value)
    // })
    return () => {
      contractWithSigner.removeListener('Transfer', () => {
        console.log('contractWithSigner removeListener Transfer ');
      })
    }
  }, [])

  useEffect(() => {
    console.log("Object.values(txs)", txs)
    console.log("Object.values(txs)", Object.values(txs))
  }, [txs])

  return (
    <Spin spinning={loading}>
      <Layout className='app'>
        <Content>
          <div className='header'>
            <h1>{`傻瓜币（Name：${name} Symbol：${symbol} Decimals：${decimals}）`}</h1>
            合约地址：
            <span className='address'>{VITE_REACT_APP_CONTARCT_ADDRESS}</span>
            合约供应量：
            <span className='address'>{supply}</span>
            <div className='notic'>注意：账户地址和私钥均属于网络公开测试，千万不要用于私人转账使用！！！</div>
          </div>
          <Row className='content'>

            {/* Owner */}
            <Col span={12} className="left">
              <Card title='创建者'>
                <div>
                  创建者账户：
                  <span className='address'>{address}</span>
                </div>
                <div>
                  创建者私钥：
                  <span className='address'>{VITE_REACT_APP_DEPLOYER_PRIVATE_KEY}</span>
                </div>
                <div>
                  ETH余额：
                  <span className='address'>{ownerWalletBlance}</span>
                </div>
                <div>
                  Fool币余额：
                  <span className='address'>{ownerBlance}</span>
                </div>


                <div className='operate'>
                  <div style={{ marginTop: 16 }}>
                    <Input addonBefore="收款地址：" value={VITE_REACT_APP_RECIVER} readOnly className="input" />
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <InputNumber addonBefore="转账数量：" value={number} min={0} className="input" onChange={v => setNumber(v)} />
                  </div>

                  <Button style={{ marginTop: 16 }} onClick={sendToken}>发币</Button>
                </div>
              </Card>

            </Col>

            {/* Reciver */}
            <Col span={12} className="right">
              <Card title='接收者'>
                <div>
                  接收者账户：
                  <span className='address'>{VITE_REACT_APP_RECIVER}</span>
                </div>
                <div>
                  接收者私钥：
                  <span className='address'>{VITE_REACT_APP_RECIVER_PRIVATE_KEY}</span>
                </div>
                <div>
                  Fool余额：
                  <span className='address'>{reciverBlance}</span>
                </div>
              </Card>

            </Col>
          </Row>

          {/* <Card className='tx' title="交易信息" style={{ overflowY: "auto" }}>
            <ReactJson displayDataTypes={false} name={false} src={Object.values(txs)} onSelect={showTxDetail} />
          </Card> */}
          <Card className='tx' title="交易历史" style={{ overflowY: "auto", maxHeight: '200px' }}>
            {
              eventList.map((event, index) => {
                return <div key={index}>{event}</div>
              })
            }
          </Card>
          <Card className='tx' title="交易信息" style={{ overflowY: "auto" }}>
            {
              Object.keys(txs).map(key => {
                return <div key={key}>
                  <pre>{JSON.stringify(txs[key], null, 2)}</pre>
                  <button onClick={() => showTranstionDetail(txs[key])}>查看交易详细信息</button>
                </div>
              })
            }
          </Card>

          <Modal
            centered
            destroyOnClose
            width={1000}
            open={modal && !!modal.hash}
            title={`交易信息：${modal?.hash}`}
            onOk={() => setModal({})}
            onCancel={() => setModal({})}
          >
            <ReactJson
              style={{ height: 800, overflowY: 'auto' }}
              theme="chalk"
              src={modal && modal.data}
              collapseStringsAfterLength={100}
              onSelect={showTxDetail}
              name={false}
              displayDataTypes={false} />
          </Modal>
        </Content>
      </Layout>
    </Spin>
  );
}

export default WalletHome;
