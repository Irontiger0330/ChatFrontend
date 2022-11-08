import Message from "./Message";

export default function MessageBox({ messages, user_id, to_id }) {

    const users = localStorage.getItem('user');
    // console.log(users);
    console.log(messages, user_id, to_id)
    return (
        <div>
            {messages.mess.map((listMessage) => <Message key={listMessage.id} listMess={listMessage} user_id={user_id} to_id={to_id} />)}
        </div>
    )
}