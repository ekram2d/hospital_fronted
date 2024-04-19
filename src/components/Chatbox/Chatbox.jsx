/* eslint-disable react/prop-types */
import { Avatar, Image } from "antd";

export function ChatboxReciever({ avatar, user, message }) { // Pass the avatar as a prop
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row' }}>
            <Avatar size={50} src={<Image src={avatar} style={{ objectFit: 'cover', width: 45, height: 45, borderRadius: '100%' }} preview={false} />} />

            <p style={{ padding: 10, backgroundColor: 'green', borderRadius: 10, maxWidth: '60%' }}>
                <strong style={{ fontSize: 13 }}>
                    {user}
                </strong>
                <br></br>
                {message}
            </p>
        </div>
    );
}

export function ChatboxSender({ avatar, user, message }) { // Pass the avatar as a prop
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Avatar size={50} src={<Image src={avatar} style={{ objectFit: 'cover', width: 45, height: 45, borderRadius: '100%' }} preview={false} />} />

            <p style={{ padding: 10, backgroundColor: '#fff', borderRadius: 10, maxWidth: '60%' }}>
                <strong style={{ fontSize: 13 }}>
                    {user}
                </strong>
                <br></br>
                {message}
            </p>
        </div>
    );
}
