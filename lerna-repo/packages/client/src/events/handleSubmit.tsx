import { signUp, signIn } from '../api';

export const handleSubmit = (
    e: React.SyntheticEvent,
    form: HTMLFormElement,
    isSignUp: boolean,
) => {
    e.preventDefault();
    if (isSignUp) {
        if (form != null) {
            const email = form.email.value.toString();
            const name = form.username.value.toString();
            const lastName = form.lastName.value.toString();
            const password = form.password.value.toString();

            let formData = new Object();
            formData = {
                email: email,
                name: name,
                lastName: lastName,
                password: password,
            };
            console.log(
                `email:${form.email.value},password:${form.password.value},name:${form.username.value}`,
            );

            signUp(JSON.stringify(formData)).then(
                res => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                },
            );
        }
    } else if (!isSignUp) {
        if (form != null) {
            const email = form.email.value.toString();
            const password = form.password.value.toString();

            console.log(`email: ${email}, password: ${password}`);

            let formData = new Object();
            formData = {
                email: email,
                password: password,
            };
            console.log(
                `formEmail:${form.email.value}, formPassword:${form.password.value}`,
            );

            signIn(JSON.stringify(formData)).then(
                res => {
                    console.log(res);
                },
                err => {
                    console.log(err);
                },
            );
        }
    }
};