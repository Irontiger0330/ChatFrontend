import axios from "axios";
import { useEffect, useState } from "react";

export function ChatBox(chatData, { onQuery }) {

    const [user_data, setUser_data] = useState({ user_data: [] });

    const user_id = chatData.user_id;
    const state = [];
    const to_id = chatData.chat.id;

    const [userValue, setUser] = useState({ userMess: [] });

    const selectUser = (e) => {
        chatData.onQuery(e)
    }
    useEffect(() => {

    }, []);
    if (chatData.chat.active == 1) {
        state.push(<span className="badge bg-success badge-dot"></span>)
    } else {
        state.push(<span className="badge bg-danger badge-dot"></span>)
    }

    if (chatData.chat.id == user_id) {
        return (
            <li></li>
        )
    } else {
        return (
            <li className="p-2 border-bottom">
                <a
                    src={to_id}
                    className="d-flex justify-content-between"
                    role="button"
                    value={to_id}
                    onClick={() => selectUser(to_id)}
                >
                    <div className="d-flex flex-row">
                        <div>
                            <img
                                src={chatData.chat.avatar}
                                alt="avatar"
                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                width="60"
                            />
                            {state}
                        </div>
                        <div className="pt-1">
                            <p className="fw-bold mb-0">{chatData.chat.name}</p>
                            <p className="small text-muted">
                                {chatData.chat.mess}
                            </p>
                        </div>
                    </div>
                    <div className="pt-1">
                        <p className="small text-muted mb-1">Yesterday{chatData.chat.id}</p>
                    </div>
                </a>
            </li>
        )
    }




}