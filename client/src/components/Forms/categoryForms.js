 

export default function CategoryForms({value, setValue, handleSubmit, handleDelete ,buttonText="Submit"}){

return(
        <form onSubmit={handleSubmit}>
            <ul className='list-group list-unstyled'>
                    <li className='list-group-item'>
                        <input type='text' className='formcontrol p-3' placeholder='Category Name' value={value}
                    onChange={(e)=>setValue(e.target.value)}>
                    </input>
                    </li>   
                    <li  className='list-group-item'>
                        <div className="d-flex justify-content-between">
                            <button className='btn btn-primary mt-3 ml-3 mr-3'>{buttonText}</button>
                           {handleDelete &&
                            <button className='btn btn-danger mt-3 ml-3 mr-3' onClick={handleDelete} >Delete</button>}
                        </div>
                                                        
                    </li>   

            </ul>
        </form>
    )
}