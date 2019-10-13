import * as React from "react";

import { Form, Select, Input, Button, Icon, Row, Col } from "antd";

import { Topics } from "../../../../types/listEnums";

import "./QuesionForm.scss";
import ViewQuestions from "../ViewQuestions";

const { Option } = Select;
export interface Props {
  children?: React.ReactNode;
  form: any;
}

export interface State {
  topics: Topics[];
  isDrawerVisible: boolean;
  questionList: [];
  subject: string;
}

let id = 0;

class QuesionForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      topics: [{ key: "na", value: "Not Applicable" }],
      isDrawerVisible: false,
      questionList: [],
      subject: ""
    };
  }

  componentDidMount() {
    // TODO : Add fetch to get the list of topics from firebase
  }

  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const { questionList, subject } = values;
        console.log("Received values of form: ", values);
        this.setState({ questionList, subject });
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
    const { topics } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
      }
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 19, offset: 5 }
      }
    };
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map(
      (k: string | number | undefined, index: number) => (
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? "Questions" : ""}
          required={true}
          key={k}
        >
          {getFieldDecorator(`questionList[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input question's or delete this field."
              }
            ]
          })(
            <Input
              placeholder="type your question here"
              style={{ width: "60%", marginRight: 8 }}
            />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          ) : null}
        </Form.Item>
      )
    );

    return (
      <>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.handleSubmit}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item wrapperCol={{ span: 3, offset: 18 }}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Button type="primary" onClick={this.showDrawer}>
                      View
                    </Button>
                  </Col>
                  <Col span={12}>
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
                  <Select placeholder="Select a topic">
                    {topics.map(topic => (
                      <Option value={topic.key}>{topic.value}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              {formItems}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={this.add}
                  style={{ width: "60%" }}
                >
                  <Icon type="plus" /> Add Question
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <ViewQuestions
          questionList={this.props.form.getFieldValue("questionList")}
          subject={this.props.form.getFieldValue("subject")}
          hideDrawer={this.hideDrawer}
          showDrawer={this.state.isDrawerVisible}
        />
      </>
    );
  }
}

export default Form.create({ name: "coordinated" })(QuesionForm);
