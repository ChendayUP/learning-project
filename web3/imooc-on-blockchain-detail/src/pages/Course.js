import React from 'react'
import { ipfsPrefix, courseListContract, web3, getCourseContract } from '../config'
import { Row, Col, Badge, Button, Switch } from 'antd';
import { Link } from 'react-router-dom'

class Course extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detailList: [],
            showAll: true,
            addressList: [],
            account: '',
            isCeo: false
        }
        this.init()
    }

    async init() {
        const [account] = await web3.eth.getAccounts()
        console.log(account)
        const isCeo = await courseListContract.methods.isCeo().call({ from: account })
        const addressList = await courseListContract.methods.getCourse().call({
            from: account
        })


        console.log(addressList)
        const detailList = await Promise.all(
            addressList.map(address => {
                return getCourseContract(address).methods.getDetail().call({
                    from: account
                })
            })
        )
        console.log(detailList)
        this.setState({
            isCeo,
            addressList,
            detailList,
            account
        })
        this.setState({
            addressList
        })

    }

    onChangeSwitch = (v) => {
        this.setState({
            showAll: v
        })
    }

    async remove(i) {
        const addressList = await courseListContract.methods.removeCourse(i).send({
            from: this.state.account,
            gas: "5000000"
        })
        this.init()
    }


    render() {
        return <Row style={{ marginTop: "30px" }} gutter={[16, 32]}>
            <Col span={20}>
                <Switch onChange={this.onChangeSwitch} checkedChildren="全部" unCheckedChildren="已上线" defaultChecked></Switch>
            </Col>
            {this.state.detailList.map((detail, i) => {

                const address = this.state.addressList[i]
                let [name, content, target, fundingPrice, price, img, video, count, isOnline, role] = Object.values(detail)
                if (!this.state.showAll && !isOnline) {
                    return null
                }
                target = web3.utils.fromWei(target)
                fundingPrice = web3.utils.fromWei(fundingPrice)
                price = web3.utils.fromWei(price)
                let buyPrice = isOnline ? price : fundingPrice
                return (
                    <Col key={img} span={6}>
                        <div className="content">
                            <p>
                                <span>{name}</span>
                                <span>{
                                    isOnline
                                        ? <Badge count="已上线" style={{ backgroundColor: "#52c41a" }}></Badge>
                                        : <Badge count="众筹中"></Badge>
                                }</span>
                            </p>
                            <img className="item" src={`${ipfsPrefix}${img}`} alt="" />
                            <div className="center">
                                <p>
                                    {`目标${target}ETH,已有${count}人支持`}
                                </p>
                                <p>
                                    {
                                        isOnline ? <Badge count={`上线价${price}ETH`} style={{ backgroundColor: "#52c41a" }}></Badge>
                                            : <Badge count={`众筹价${fundingPrice}ETH`}></Badge>
                                    }
                                </p>
                                <Button type="primary" block style={{ marginBottom: "10px" }}>
                                    <Link to={`/detail/${address}`}> 查看详情</Link>
                                </Button>
                                {
                                    this.state.isCeo ? <Button type="primary" onClick={() => this.remove(i)} block>删除</Button> : null
                                }

                            </div>
                        </div>
                    </Col>
                )
            })}
        </Row>
    }
}

export default Course