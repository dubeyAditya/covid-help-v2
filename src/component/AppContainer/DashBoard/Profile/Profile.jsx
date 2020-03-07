import * as React from "react";
import { Alert, Divider, Button } from 'antd';
import { AuthContext, appContext } from "../../../../context";
import "./Profile.scss";
import { useState } from "react";
import { RegistrationForm } from "..";
// import api from '../../../../services';

const Profile = () => {

    const { user } = React.useContext(AuthContext);

    const { isGuest } = React.useContext(appContext);

    const [showForm, setShowForm] = useState(false);

    // const submitQuiz = (result: any) => {
    //     api.add('results', result)
    //     .then(() => message.success("Result Updated to Server"))
    //     .catch((err) => message.error(err));
    // }

    return (
        <div>
            {isGuest
                ? showForm
                    ? <RegistrationForm />
                    : <>
                        <Alert
                            message={`Welcome ${user.displayName}`}
                            description="You are not registerd with Newton Academy. Please click below to create your profile."
                            type="info"
                            showIcon
                        />
                        <Divider></Divider>
                        <div className="register-btn">
                            <Button type='primary' onClick={() => setShowForm(true)} block>Click Here to Register</Button>
                        </div>
                    </>
                :
                <>
                    <Alert
                        message={`Welcome Back, ${user.displayName}`}
                        description="You are Registerd with Newton Academy. Exams will be assigned to you shortly."
                        type="success"
                        showIcon
                    />
                </>

            }
        </div>
    )
}
export default Profile;