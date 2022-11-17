import { Button, Card, Spacer, Text, User } from "@nextui-org/react";
import React, { createRef, useEffect, useRef } from "react";
import { useState } from "react";
import useApi from "../../hooks/useApi";

import { RiUserFollowLine } from "react-icons/ri";

export default function UserSuggestionCard() {
  const [users, setUsers] = useState([]);
  const [buttons, setButtons] = useState([]);
  const { getSuggestedUserList, postUserFollowingRequest } = useApi();

  useEffect(() => {
    getSuggestedUserList()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Cannot get suggested users: ", err));
  }, []);

  const handleUpdateFollowing = (e, id) => {
    postUserFollowingRequest({
      action: e.target.value,
      user_id: id,
    })
      .then((res) => {
        setUsers(users.filter((user) => user.id !== res.data.user_id));
      })
      .catch((err) => console.error("Cannot update followings: ", err));
  };

  return (
    <Card isHoverable css={{ mh: "50vh" }}>
      <Card.Header>
        <Text h4 color="primary" css={{ m: 0 }}>
          Suggested authors
        </Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ p: 0 }}>
        {users.length ? (
          users.map((user, index) => (
            <div key={index}>
              <Spacer y={0.5} />
              <User src={user.profile_photo} name={`${user.first_name} ${user.last_name}`}>
                <User.Link href={`/p/${user.username}`}>{user.username}</User.Link>
                <Button size="xs" icon={<RiUserFollowLine />} value="follow" onPress={(e) => handleUpdateFollowing(e, user.id)}>
                  Follow
                </Button>
              </User>
              <Spacer y={0.5} />

              <Card.Divider />
            </div>
          ))
        ) : (
          <Text css={{ p: "$4" }}>There is no user to suggest.</Text>
        )}
      </Card.Body>
    </Card>
  );
}
