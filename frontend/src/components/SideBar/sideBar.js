import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchChannels } from '../../redux/reducers/app/channelsSlice';

const SideBar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);
    const channels = useSelector((state) => state.channels);
    console.log(channels);
    return (
      <div className="border-end bg-light p-4">
        <b>Каналы</b>
        <ListGroup className="mt-3">
          <ListGroup.Item action active>general</ListGroup.Item>
          <ListGroup.Item action>random1</ListGroup.Item>
        </ListGroup>
        <Button variant="primary" className="mt-3">Добавить канал</Button>
      </div>
    );
  };

  export default SideBar;
