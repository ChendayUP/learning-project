import React from 'react'
import { Row, Col, Form, Input, Upload, Button } from 'antd'
import { saveImageToIpfs, ipfsPrefix, courseListContract, web3 } from '../config'
import {Redirect} from 'react-router-dom'

const FormItem = Form.Item
class Create extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toindex: false,
            name: '',
            content: '',
            img: '',
            target: '',
            fundingPrice: '',
            price: ''
        }
    }

    handleSubmit = async (e) => {
        console.log(this.state)
        e.preventDefault()
        const [account] = await web3.eth.getAccounts()
        const balance = await web3.eth.getBalance(account)
        const balanceEth = web3.utils.fromWei(balance, 'ether')
        console.log(`账户余额: ${balanceEth} ETH`)
        const arr = [
            this.state.name,
            this.state.content,
            web3.utils.toWei(this.state.target),
            web3.utils.toWei(this.state.fundingPrice),
            web3.utils.toWei(this.state.price),
            'imageurl'
            // this.state.img
        ]
        console.log('account:',account, arr)
        await courseListContract.methods.createCourse(...arr)
            .send({
                from:account
            })

        this.setState({
            toindex: true
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleUpload = async (file) => {
        const hash = await saveImageToIpfs(file)
        this.setState({
            img: hash
        })
        return false
    }

    render() {
        if(this.state.toindex){
            return <Redirect to='/'></Redirect>
        }
        return (<Row
            type='flex'
            justify='center'
            style={{ marginTop: '30px' }}
        >
            <Col span={20}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label='课程名'>
                        <Input name='name' onChange={this.onChange} />
                    </FormItem>
                    <FormItem label='课程详情'>
                        <Input.TextArea row={6} name='content' onChange={this.onChange} />
                    </FormItem>
                    <FormItem label='课程结构图'>
                        <Upload beforeUpload={this.handleUpload}
                            showUploadList={false}
                        >
                            {this.state.img ? <img height='100px' src={`${ipfsPrefix}${this.state.img}`} alt="" />
                                : (<Button type='primary'>上传图片</Button>)

                            }

                        </Upload>
                    </FormItem>
                    <FormItem label='众筹目标'>
                        <Input name='target' onChange={this.onChange} />
                    </FormItem>
                    <FormItem label='众筹价格'>
                        <Input name='fundingPrice' onChange={this.onChange} />
                    </FormItem>
                    <FormItem label='上线价格'>
                        <Input name='price' onChange={this.onChange} />
                    </FormItem>

                    <FormItem>
                        <Button type='primary' htmlType='submit'>添加课程</Button>
                    </FormItem>

                </Form>
            </Col>
        </Row>)
    }
}

export default Create