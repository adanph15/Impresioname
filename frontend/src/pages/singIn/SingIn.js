import "./SingIn.css";

export default function SingIn() {
    return (
        <>
            <body>
                <p>IMPRESIONAME</p>

                <form className="singin-form-container">
                    <div className="singin-form-item">
                        <h4>name</h4>
                        <input name="name" type="text"></input>
                    </div>
                    <div className="singin-form-item">
                        <h4>password</h4>
                        <input name="password" type="password"></input>
                    </div>
                    <div className="singin-form-item">
                        <button>enter</button>
                    </div>
                </form>
            </body>
        </>
    );
}