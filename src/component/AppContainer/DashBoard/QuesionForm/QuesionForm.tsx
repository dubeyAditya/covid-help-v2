import * as React from "react";

import { Form, Select, Input, Button, Icon, Row, Col, Upload, message } from "antd";


import api from "../../../../services";

import ViewQuestions from "../ViewQuestions";

import "./QuesionForm.scss";

const { Option } = Select;
export interface Props {
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

let id = 0;

class QuesionForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      topics: "",
      isDrawerVisible: false,
      questionList: [],
      subject: "",
      url: "",
      fileName:""
    };
  }

  componentDidMount() {
    // TODO : Add fetch to get the list of topics from firebase
  }

  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        api.add(values)
        // Push values to firebase
      }
    });
  };

  remove = (k: any) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key: any) => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // const questionList = form.getFieldValue("questionList");
    // this.setState({questionList});
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
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
            that.setState({ url,fileName: info.file.name });
          })
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.handleSubmit}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item  wrapperCol={{ span: 6 ,offset: 18 }}>
                <Row gutter={24}>
                  <Col span={8}>
                    <Button type="primary" onClick={this.showDrawer}>
                      Preview
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Col>

                </Row>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
          <Col span={12}>
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
            </Col>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
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
            </Col>

          </Row>
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

export default Form.create({ name: "coordinated" })(QuesionForm);
