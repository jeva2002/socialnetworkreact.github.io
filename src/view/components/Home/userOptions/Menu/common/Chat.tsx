import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import noPhoto from '../../../../../../assets/icons/no-photo.svg';
import { setActive } from '../../../../../../controller/features';
import { setCurrentChat } from '../../../../../../controller/features/chats';
import { ContactData } from '../../../../../../types';

interface Props {
  contact: ContactData | undefined;
  currentUser: any;
  lastMessage: boolean;
}

const Chat: React.FunctionComponent<Props> = ({
  contact,
  currentUser,
  lastMessage,
}) => {
  const [profilePic, setProfilePic] = useState(contact?.profileImg || noPhoto);
  const [name, setName] = useState<number | string | undefined>(contact?.cel);

  const dispatch = useDispatch();

  const nickname = currentUser?.contacts?.find(
    (e: any) => e.cel === contact?.cel
  );

  useEffect(() => {
    if (nickname?.contact !== '') setName(nickname?.contact);
    else setName(contact?.cel)
  }, [nickname?.contact, contact]);

  if (contact) {
    return (
      <article
        className='menu-chat d-flex border-bottom py-2 ps-3 gap-3 m-0'
        style={{ maxHeight: 100, overflow: 'hidden' }}
        onClick={() => {
          dispatch(setCurrentChat(contact));
          dispatch(setActive());
        }}
      >
        <img
          className='profile'
          src={profilePic}
          alt='Profile pic'
          onError={() => setProfilePic(noPhoto)}
        />
        <div className='d-flex flex-column justify-content-center gap-0'>
          <h3 className='p-0 m-0' style={{ fontSize: 18 }}>
            {name ? name : contact?.cel}
          </h3>
          {!lastMessage ? (
            <small
              className='p-0 m-0'
              style={{ height: 18, overflow: 'hidden' }}
            >
              {contact?.chat.messages?.at(-1)?.message}
            </small>
          ) : null}
        </div>
      </article>
    );
  } else return <></>;
};

export default Chat;
