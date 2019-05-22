/**
 *@author zhaojian
 *@date 2019/3/15
 *@Description:
 */
import React, {Component, Fragment} from 'react';
import {findDOMNode} from 'react-dom';
import {
    Avatar,
    Button,
    Card,
    Col,
    DatePicker,
    Dropdown,
    Form, Icon,
    Input,
    List, Menu,
    Modal, Progress,
    Radio,
    Row,
    Select
} from "@fmd/component-pro";
import {Result} from "@fmd/component-pro-view";
import moment from "moment";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const {Search, TextArea} = Input;
const errimg = require('@common/images/errimg.png');
import '../style/basicList.scss';

class BasicList extends Component {
    state = {visible: false, done: false, current:[]};
    formLayout = {
        labelCol: {span: 7},
        wrapperCol: {span: 13},
    };

    constructor(props) {
        super(props);

    }

    showModal = () => {
        this.setState({
            visible: true,
            current: undefined,
        });
    };

    showEditModal = item => {
        this.setState({
            visible: true,
            current: item,
        });
    };

    handleDone = () => {
        setTimeout(() => this.addBtn.blur(), 0);
        this.setState({
            done: false,
            visible: false,
        });
    };

    handleCancel = () => {
        setTimeout(() => this.addBtn.blur(), 0);
        this.setState({
            visible: false,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {form} = this.props;
        const {current} = this.state;
        const id = current ? current.id : '';

        setTimeout(() => this.addBtn.blur(), 0);
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            this.setState({
                done: true,
            });
            // dispatch({
            //     type: 'list/submit',
            //     payload: {id, ...fieldsValue},
            // });
        });
    };
    /**
     * 图片加载失败处理事件
     * @param e
     * @returns {boolean} 返回false关闭默认处理事件，可以自定义图片显示操作，不然会被移走img
     */
    imgError = (e) => {
        e ? e.currentTarget.childNodes[0].src = errimg : '';
        return false;
    };
    deleteItem = id => {
        // const {dispatch} = this.props;
        // dispatch({
        //     type: 'list/submit',
        //     payload: {id},
        // });
    };

    extraContent = () => {
        return (
            <div className='extraContent'>
                <RadioGroup defaultValue="all">
                    <RadioButton value="all">全部</RadioButton>
                    <RadioButton value="progress">进行中</RadioButton>
                    <RadioButton value="waiting">等待中</RadioButton>
                </RadioGroup>
                <Search className='extraContentSearch' placeholder="请输入" onSearch={() => ({})}/>
            </div>
        );
    };
    getModalContent = () => {
        const {done, current} = this.state;
        const {
            form: {getFieldDecorator},
            listFormFiled,
        } = this.props;
        if (done) {
            return (
                <Result
                    iconType="check-circle"
                    resultTips="提交成功"
                    resultType="success"
                    iconBgColor="#52c41a"
                />
            );
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                {listFormFiled.map((item, index)=>{
                    switch (item.inputStyle) {
                        case 'DatePicker':
                            return (
                                <FormItem label={item.value} {...this.formLayout} key={index}>
                                    {getFieldDecorator(item.name, {
                                        rules: [{required: true, message: '请选择开始时间'}],
                                        initialValue: current && current.createdAt ? moment(current.createdAt) : null,
                                    })(
                                        <DatePicker
                                            showTime
                                            placeholder="请选择"
                                            format="YYYY-MM-DD HH:mm:ss"
                                            style={{width: '100%'}}
                                        />
                                    )}
                                </FormItem>
                            );
                        case 'basicSelect' :
                            return (
                                <FormItem label={item.value} {...this.formLayout} key={index}>
                                    {getFieldDecorator(item.name, {
                                        rules: [{required: true, message: '请选择任务负责人'}],
                                        initialValue: current && current.owner,
                                    })(
                                        <Select placeholder="请选择">
                                            <SelectOption value="付晓晓">付晓晓</SelectOption>
                                            <SelectOption value="周毛毛">周毛毛</SelectOption>
                                        </Select>
                                    )}
                                </FormItem>
                            );
                        case 'TextArea':
                            return (
                                <FormItem {...this.formLayout} label={item.value} key={index}>
                                    {getFieldDecorator(item.name, {
                                        rules: [{message: '请输入至少五个字符的产品描述！', min: 5}],
                                        initialValue: current && current.subDescription,
                                    })(<TextArea rows={4} placeholder="请输入至少五个字符"/>)}
                                </FormItem>
                            );
                        default:
                            return (
                                <FormItem label={item.value} {...this.formLayout} key={index}>
                                    {getFieldDecorator(item.name, {
                                        rules: [{required: true, message: '请输入任务名称'}],
                                        initialValue: current && current.title,
                                    })(<Input placeholder="请输入"/>)}
                                </FormItem>
                            );
                    }

                })}
            </Form>
        );
    };

    render() {
        const {data, deleteInfo} = this.props;
        const {list = []} = data;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 5,
            total: 50,
        };
        const {visible, done, current = {}} = this.state;
        const editAndDelete = (key, currentItem) => {
            if (key === 'edit') this.showEditModal(currentItem);
            else if (key === 'delete') {
                Modal.confirm({
                    title: deleteInfo.title,
                    content: deleteInfo.content,
                    okText: deleteInfo.okText,
                    cancelText: deleteInfo.cancelText,
                    onOk: () => this.deleteItem(currentItem.id),
                });
            }
        };
        const modalFooter = done
            ? {footer: null, onCancel: this.handleDone}
            : {okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel};

        const Info = ({title, value, bordered}) => (
            <div className='headerInfo'>
                <span>{title}</span>
                <p>{value}</p>
                {bordered && <em/>}
            </div>
        );
        const ListContent = ({data: {owner, createdAt, percent, status}}) => (
            <div className='listContent'>
                <div className='listContentItem'>
                    <span>Owner</span>
                    <p>{owner}</p>
                </div>
                <div className='listContentItem'>
                    <span>开始时间</span>
                    <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <div className='listContentItem'>
                    <Progress percent={percent} status={status} strokeWidth={6} style={{width: 180}}/>
                </div>
            </div>
        );
        const MoreBtn = props => (
            <Dropdown
                overlay={
                    <Menu onClick={({key}) => editAndDelete(key, props.current)}>
                        <Menu.Item key="edit">编辑</Menu.Item>
                        <Menu.Item key="delete">删除</Menu.Item>
                    </Menu>
                }
            >
                <a>
                    更多 <Icon type="down"/>
                </a>
            </Dropdown>
        );
        return (
            <Fragment>

                <div className='standardList'>
                    <Card bordered={false}>
                        <Row>
                            <Col sm={8} xs={24}>
                                <Info title="我的待办" value="8个任务" bordered/>
                            </Col>
                            <Col sm={8} xs={24}>
                                <Info title="本周任务平均处理时间" value="32分钟" bordered/>
                            </Col>
                            <Col sm={8} xs={24}>
                                <Info title="本周完成任务数" value="24个任务"/>
                            </Col>
                        </Row>
                    </Card>

                    <Card
                        className='listCard'
                        bordered={false}
                        title="标准列表"
                        style={{marginTop: 24}}
                        bodyStyle={{padding: '0 32px 40px 32px'}}
                        extra={this.extraContent()}
                    >
                        <Button
                            type="dashed"
                            style={{width: '100%', marginBottom: 8}}
                            icon="plus"
                            onClick={this.showModal}
                            ref={component => {
                                /* eslint-disable */
                                this.addBtn = findDOMNode(component);
                                /* eslint-enable */
                            }}
                        >
                            添加
                        </Button>

                        <List
                            size="large"
                            rowKey="id"
                            // loading={loading}
                            pagination={paginationProps}
                            dataSource={list}
                            renderItem={item => (
                                <List.Item
                                    actions={[
                                        <a
                                            onClick={e => {
                                                e.preventDefault();
                                                this.showEditModal(item);
                                            }}
                                        >
                                            编辑
                                        </a>,
                                        <MoreBtn current={item}/>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            src={item.logo}
                                            shape="square" size="large"
                                            onError={this.imgError}
                                        />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.subDescription}

                                    />
                                    <ListContent data={item}/>
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
                <Modal
                    title={done ? null : `任务${current.id ? '编辑' : '添加'}`}
                    className='standardListForm'
                    width={640}
                    bodyStyle={done ? {padding: '72px 0'} : {padding: '28px 0 0'}}
                    destroyOnClose
                    visible={visible}
                    {...modalFooter}
                >
                    {this.getModalContent()}
                </Modal>
            </Fragment>
        );
    }

}

export default Form.create({})(BasicList);