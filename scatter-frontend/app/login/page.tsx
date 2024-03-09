

export default async function Login() {

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <form className="row g-3">
                <div className="col-12">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="johns" />
                </div>
                <div className="col-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Log in</button>
                </div>
            </form>
        </div>
    )
}