import React, { useEffect, useState, useContext } from "react";

import { withRouter, RouteComponentProps } from "react-router-dom";
import { Table, Divider, Button, Icon, Skeleton, message, Popconfirm, Tooltip, Empty, Alert, Tag } from "antd";

import config from "../../../../config";

import api from "../../../../services";

import { appContext, AuthContext } from "../../../../store";
import { ViewQuestions } from "..";

import { Quiz } from '../../../../models/quiz.model';

const { Column } = Table;

interface Props extends RouteComponentProps {

}

const initialQuiz = new Quiz({
    quizTitle: "", quizSynopsis: "", questions: []
});

const ExamsTable: React.FC<Props> = ({ history }) => {

    const [exams, setExams] = useState([]);

    const [isReady, setIsReady] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [quiz, setQuiz] = useState(initialQuiz);

    const { isAdmin, hasViewAccess } = useContext(appContext);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        api.get("quizList").then(successCallback).catch(failiureCallback)
    }, []);

    const preview = (record: Quiz) => () => {
        setQuiz(record);
        setShowModal(true);
    }

    const successCallback = (exams: []) => {
        setExams(exams);
        setIsReady(true);
    }

    const failiureCallback = (err: any) => {
        console.log("Error in Feating Exams :", err);
    }

    const openQuizForm = () => {
        window.open(config.addQuizURL)
    }

    const discard = (record: any) => () => {
        api.remove("exams", record.key).then(() => {
            message.success("Exam Deleted !")
            setExams(exams.filter((exam: any) => exam.key !== record.key))
        }).catch((err) => {
            message.error("Delete Failed !");
            console.error(err);
        });
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const getDeleteBtn = (record: any) => {
        return isAdmin ? (<>
            <Popconfirm
                title="Are you sure delete this Exam?"
                onConfirm={discard(record)}
                okText="Yes"
                cancelText="No"
            >
                <Tooltip placement='bottom' title='Delete'>  <Button type="link"> <Icon type="delete" /></Button></Tooltip>
            </Popconfirm></>) : null;
    }

    const getViewBtn = (record: any) => {
        return isAdmin
            ? <Tooltip placement='bottom' title='View Exam'>
                <Button type="link" onClick={preview(record)}>
                    <Icon type="eye" key="details" />
                </Button>
            </Tooltip>
            : <Tooltip placement='bottom' title='View Exam'>
                <Button type="primary" onClick={() => (history.push("quiz"))}>
                    Start Quiz
                </Button>
            </Tooltip>
    }

    return (
        <>
            {
                (!isAdmin && !hasViewAccess)
                    ? <><Alert
                        message={`Hello , ${user.displayName}`}
                        description="You Don't have permission to view Exams for now. Please connect to your class Coordinator"
                        type="info"
                    /><Divider>
                        </Divider>
                        <Empty />
                    </>
                    : isReady
                        ? (
                            <>
                                {isAdmin && <div><Button style={{ marginBottom: '1rem' }} type="primary" onClick={openQuizForm}>Add Quiz</Button></div>}
                                <Table dataSource={exams} pagination={{ pageSize: 20 }} scroll={{ y: 400 }} >
                                    <Column title="Title" dataIndex="quizTitle" key="quizTitle" />
                                    <Column title="Toatal Questions" dataIndex="questions" key="questions" render={(text, record: any) => (
                                        <Tag>{record.questions.length}</Tag>
                                    )} />
                                    <Column title="Topic" dataIndex="quizSynopsis" key="quizSynopsis" />
                                    <Column
                                        title="Status"
                                        key="action"
                                        render={(text, record: any) => (
                                            <span>
                                                {getViewBtn(record)}
                                                {getDeleteBtn(record)}
                                            </span>

                                        )}
                                    />
                                </Table>
                            </>

                        )
                        : <Skeleton active />
            }
            <ViewQuestions
                quiz={quiz}
                hideDrawer={closeModal}
                showDrawer={showModal}>
            </ViewQuestions>
        </>

    );
}
export default withRouter(ExamsTable);
