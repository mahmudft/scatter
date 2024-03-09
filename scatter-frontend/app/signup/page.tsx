

export default async function Signup() {

    return (
        <div className="container d-flex g-2 flex-column align-items-center justify-content-center p-4 vh-100">
            <form className="row g-3 border p-3 ">
            <div className="row d-flex  justify-content-center align-items-center text-center mb-4">
                Sign up Form
            </div>
                <div className="col-9">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control rounded" name="email" id="email" placeholder="john@gmail.coms" />
                </div>
                <div className="col-9">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control rounded" id="password" />
                </div>
                <div className="col-9">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control rounded" id="username" placeholder="johns" />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-dark rounded">Sign up</button>
                </div>
            </form>
        </div>
    )
}