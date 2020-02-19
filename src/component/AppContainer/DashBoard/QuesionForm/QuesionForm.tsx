import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { Form, Select, Input, Button, Icon, Upload, message, Avatar } from "antd";


import api from "../../../../services";

import { Exam } from "../../../../models/exam.model";

import "./QuesionForm.scss";
import { Student } from "../../../../models/user.model";

const { Option } = Select;

export interface Props extends RouteComponentProps {
  children?: React.ReactNode;
  form: any;
}

export interface State {
  topics: "";
  isDrawerVisible: boolean;
  studentList: Student[];
  subject: string;
  url: string;
  fileName: string;

}

class QuesionForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      topics: "",
      isDrawerVisible: false,
      studentList: [],
      subject: "",
      url: "",
      fileName: ""
    };
  }

  componentDidMount() {
    // TODO : Fetch Data for specific user has questions assigned
    api.get("users")
      .then((studentList: Student[]) => this.setState({ studentList }))
      .catch(err => message.error(err));
  }

  successCallback = (data: any) => {
    console.log(data);
    message.success("Operation Success !");
    message.loading("Loading Exams....");
    this.props.history.push("/myExam");
  }

  errorCallback = (error: any) => {
    console.log(error);
    message.error("Operation Failed !");
  }

  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { successCallback, errorCallback } = this;
    const { url } = this.state;
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        if (url) {
          const examData = { ...values, url }
          api.add("exams", new Exam(examData).serialize())
            .then(successCallback)
            .catch(errorCallback);
        }
        else {
          message.loading("Please wait generating File Url...");
        }
      }
    });
  };


  showDrawer = () => {
    this.setState({ isDrawerVisible: true });
  };

  hideDrawer = () => this.setState({ isDrawerVisible: false });

  getStudents = () => {
    
    return this.state.studentList.map((student) => (
      <Option key={student.uid}  value={student.uid} >
        <Avatar src={student.photoURL}></Avatar> { " " } {student.name} ({student.className})
      </Option>))
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator("keys", { initialValue: [] });
    const that = this;
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info: any) {
        console.log(info);
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          api.upload(info.file.originFileObj).then((url) => {
            that.setState({ url, fileName: info.file.name });
          })
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <>
        <Form
          layout="vertical"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label="Exam Name">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Please Add a Name !" }
              ]
            })(
              <Input placeholder="Enter Exam Name ">
              </Input>
            )}
          </Form.Item>
          <Form.Item label="Subject">
            {getFieldDecorator("subject", {
              rules: [
                { required: true, message: "Please select your Subject!" }
              ]
            })(
              <Select placeholder="Select a subject">
                <Option value="Varg3">Varg-3</Option>
                <Option value="Physics">Physics</Option>
                <Option value="Chemistry">Chemistry</Option>
                <Option value="Maths">Maths</Option>
                <Option value="Bio">Bio</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Topic">
            {getFieldDecorator("topic", {
              rules: [
                { required: true, message: "Please select your Topic!" }
              ]
            })(
              <Input placeholder="Enter a topic">
              </Input>
            )}
          </Form.Item>
          <Form.Item label="Upload Paper">
            {
              getFieldDecorator("file", {
                rules: [{ required: true, message: "Please Upload your File!" }]
              })(<Upload {...props}><Button>
                <Icon type="upload" /> Click to Upload
                  </Button></Upload>
              )
            }
          </Form.Item>
          <Form.Item label="Select Students">
            {
              getFieldDecorator("visibility", {
                rules: [{ required: true, message: "Please Select atleast one student!" }]
              })(
                <Select
                  mode="multiple"
                  size="large"
                  placeholder="Please select students"
                  removeIcon={<Icon style={{ fontSize: '16px' }} type="close-circle" theme="twoTone" twoToneColor="#eb2f96"/>}
                  menuItemSelectedIcon={ <Icon type="check-circle" style={{ fontSize: '16px' }} theme="filled" twoToneColor="#52c41a" />}
                >
                  {this.getStudents()}
                </Select>)
            }
            {/* <Button type="primary" onClick={this.showDrawer}>
              Share With
            </Button> */}
          </Form.Item>
          <Form.Item >
            <Button  style={{float:'right'}} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

const formWithRoute = withRouter(QuesionForm);

export default Form.create({ name: "coordinated" })(formWithRoute); 
