import React, { useState }  from 'react';
import firebase from './Firebase'
import FormError from './FormError'
import { navigate } from '@reach/router'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)


    function handleSubmit(e) {
        const registrationInfo = {
            email: email,
            password: password
        }

        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(
            registrationInfo.email, registrationInfo.password
        ).then( ()=> {
            navigate('/meetings')
        }).catch( error => {
            console.log(error);
            if(error.message !== null) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage(null)
            }
        })
    }

    return(
        <form className="mt-3" onSubmit={e => handleSubmit(e) }>
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card bg-light">
                    <div className="card-body">
                        <h3 className="font-weight-light mb-3">Log in</h3>
                        <section className="form-group">
                        { errorMessage !== null ? (
                            <FormError message={errorMessage} />
                        ) : '' }
                        <label
                            className="form-control-label sr-only"
                            htmlFor="Email">
                            Email
                        </label>
                        <input
                            required
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        </section>
                        <section className="form-group">
                        <input
                            required
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value) }
                        />
                        </section>
                        <div className="form-group text-right mb-0">
                        <button className="btn btn-primary" type="submit">
                            Log in
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </form>

    ) 
}

export default Login;