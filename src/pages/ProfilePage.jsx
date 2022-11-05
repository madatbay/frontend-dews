import { Card, Grid, Text, Link, User, Loading } from "@nextui-org/react";
import { useAuth } from "../useAuth";

import { IoIosQuote } from "react-icons/io";
import { BiCake } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";

export default function ProfilePage() {
  const { userData } = useAuth();

  return userData ? (
    <Card css={{ p: "$6", mw: "1200px", m: "$0 auto" }}>
      <Card.Header>
        <User src={userData.profile_photo} size="xl" />
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}>
              {`${userData?.first_name} ${userData?.last_name}`}
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}>@{userData?.username}</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        {userData?.birth_date && (
          <Text>
            <BiCake /> {userData?.birth_date}
          </Text>
        )}
        {userData?.location && (
          <Text>
            <MdOutlineLocationOn /> {userData?.location}
          </Text>
        )}
        {userData?.bio && (
          <Text>
            <IoIosQuote /> {userData?.bio}
          </Text>
        )}
      </Card.Body>
    </Card>
  ) : (
    <Loading type="points-opacity">Loading</Loading>
  );
}
