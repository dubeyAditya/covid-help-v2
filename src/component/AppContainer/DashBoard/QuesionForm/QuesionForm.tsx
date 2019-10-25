import * as React from "react";
import {withRouter, RouteComponentProps } from "react-router-dom";

import { Form, Select, Input, Button, Icon, Upload, message } from "antd";


import api from "../../../../services";

import ViewQuestions from "../ViewQuestions";

import { Exam } from "../../../../models/exam.model";

import "./QuesionForm.scss";

const { Option } = Select;
export interface Props extends RouteComponentProps {
  children?: React.ReactNode;
  form: any;
}

export interface State {
  topics: "";
  isDrawerVisible: boolean;
  questionList: [];
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
      questionList: [],
      subject: "",
      url: "",
      fileName: ""
    };
  }

  componentDidMount() {
    // TODO : Fetch Data for specific user has questions assigned
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
    const  {successCallback, errorCallback } = this;
    const {url} = this.state;
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        if(url){
          const examData = {...values, url} 
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
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.setState({ isDrawerVisible: true });
      }
    });
  };

  hideDrawer = () => this.setState({ isDrawerVisible: false });

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const that = this;;
    getFieldDecorator("keys", { initialValue: [] });

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
              <Form.Item label="Name">
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Please Add a Name !" }
                  ]
                })(
                  <Input placeholder="Enter a Name ">
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
                    <Option value="Physics">Physics</Option>
                    <Option value="Chemistry">Chemistry</Option>
                    <Option value="Maths">Maths</Option>
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
                  })(<Upload {...props}>
                    <Button>
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  </Upload>
                  )}
              </Form.Item>
              <Form.Item >
                    {/* <Button type="primary" onClick={this.showDrawer}>
                      Preview
                    </Button> */}
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
              </Form.Item>
        </Form>
        <ViewQuestions
          subject={getFieldValue('subject')}
          url={this.state.url}
          hideDrawer={this.hideDrawer}
          showDrawer={this.state.isDrawerVisible}
          fileName={this.state.fileName}>
        </ViewQuestions>
      </>
    );
  }
}

const formWithRoute = withRouter(QuesionForm);

export default Form.create({ name: "coordinated" })(formWithRoute); 
