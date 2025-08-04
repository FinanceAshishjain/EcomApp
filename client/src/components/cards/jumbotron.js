export default function Jumbotron({title, subtitle}){
    return(
        <div className="container-fluid bg-light">
            <div className="row">
                <div className="col text-center p-4 bg-light">
                    <h1>{title}</h1>
                    <p className="lead"> {subtitle}</p>
                </div>
            </div>
        </div>
    )
}