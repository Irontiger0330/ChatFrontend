export default function Message(props){

    const message = props.listMess;
    const user_id = props.user_id;
    const to_id = props.to_id;
    const list = [];

    console.log("kkk", user_id, to_id);

    if (message.from_id == user_id && message.to_id == to_id) {
        list.push(<div className='d-flex flex-row justify-content-start'><img className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" src={message.avatar} alt='avatar 1' style={{ width: '45px', height: '100%' }} /> <div> <p className='small p-2 ms-3 mb-1 rounded-3' style={{ backgroundColor: '#f5f6f7' }} > {message.message} </p> <p className=''>{message.date}</p> </div> </div>);
             
    } else if(message.from_id == to_id && message.to_id == user_id) {
        list.push(<div className='d-flex flex-row justify-content-end'><div><p className='small p-2 me-3 mb-1 text-white rounded-3 bg-primary'>{message.message} </p><p className='small me-3 mb-3 rounded-3 text-muted'>{message.date}</p></div><img className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" src={message.avatar} alt='avatar 1' style={{ width: '45px', height: '100%' }} /></div>);
    } else {
        list.push(<div></div>)
    }
    return(
        <div>{list}</div>
    )
}