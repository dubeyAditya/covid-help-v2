import React from "react";
import { withRouter } from "react-router-dom"
import {
    Form,
    Input,
    Select,
    Button,
    message,
    Result
} from 'antd';
import { AuthContext } from "../../../../context";
import { Student } from "../../../../models/user.model";
import api from '../../../../services'


const { Option } = Select;

class RegistrationForm extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        isRegisterd: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { user } = this.context;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const name = values.first_name + " " + values.last_name;
                const studentData = { ...user, ...values, name };
                const student = new Student(studentData).serialize();
                api.add('users', student)
                    .then(() => {
                        this.setState({ isRegisterd: true });
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                    })
                    .catch((err) => message.error("Opps Something went wrong. Please try after sometime."));
            }
        });
    };

    handleConfirmBlur = (e) => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 4,
                    offset: 20,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '91',
        })(
            <Select style={{ width: 70 }}>
                <Option value="91">+91</Option>
            </Select>,
        );

        return (
            this.state.isRegisterd
                ?
                <Result
                    status="success"
                    title="Successfully Registered!"
                    subTitle="Welcome to Newton Academy. You will be redirected in few seconds."
                />
                : <>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="E-mail">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item
                            label={
                                <span>
                                    First Name
                        </span>
                            }
                        >
                            {getFieldDecorator('first_name', {
                                rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    Last Name
                        </span>
                            }
                        >
                            {getFieldDecorator('last_name', {
                                rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item label="Phone Number">
                            {getFieldDecorator('phoneNumber', {
                                rules: [{ required: true, message: 'Please input your phone number!' }],
                            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                        </Form.Item>

                        <Form.Item label="Course Name">
                            {getFieldDecorator('course', {
                                rules: [{ required: true, message: 'Please Select Course!' }],
                            })(<Select>
                                <Option value='Senior Secondary'> Senior Secondary Exams (9-12th) </Option>
                                <Option value='Competitive'> Competitive Exams(Sanvida Varg 3) </Option>
                            </Select>)}
                        </Form.Item>

                        <Form.Item label="Batch Name">
                            {getFieldDecorator('className', {
                                rules: [{ required: true, message: 'Please Select Batch!' }],
                            })(<Select>
                                <Option value='Samvida'> Samvida </Option>
                                <Option value='9'> 9<sup>th</sup> </Option>
                                <Option value='10'> 10<sup>th</sup> </Option>
                                <Option value='11'> 11<sup>th</sup> </Option>
                                <Option value='12'> 12<sup>th</sup> </Option>
                            </Select>)}
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Register
                    </Button>
                        </Form.Item>
                    </Form>
                </>
        );
    }

    componentDidMount() {
        const { form } = this.props;
        const { email } = this.context;
        form.setFieldsValue({
            email: email
        });
    }
}

RegistrationForm.contextType = AuthContext;



const WrappedRegistrationForm = Form.create({ name: 'register' })(withRouter(RegistrationForm));

export default WrappedRegistrationForm;
