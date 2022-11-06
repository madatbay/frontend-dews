import { Button, Card, Grid, Loading, Row, Text, User } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import ReactMarkdown from "react-markdown";

import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

import { useAuth } from "../../useAuth";
import DeletePostModal from "../../components/DeletePostModal";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [visibleDeleteModal, setVisibleDeleteModal] = useState(0);

  const { listPosts, votePost } = useApi();
  const { userData } = useAuth();

  useEffect(() => {
    listPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Connot get posts: ", err))
      .finally(() => {
        setLoading(false);
        searchParams.delete("refresh");
        setSearchParams(searchParams);
      });
  }, [posts.length, searchParams.get("refresh")]);

  const handleVotePost = (id, mode, index) => {
    votePost(id, { mode: mode })
      .then((res) => {
        let postsCopy = [...posts];
        postsCopy[index]["upvote_count"] = res.data.upvote_count;
        postsCopy[index]["downvote_count"] = res.data.downvote_count;
        postsCopy[index]["is_upvoted"] = res.data.is_upvoted;
        postsCopy[index]["is_downvoted"] = res.data.is_downvoted;

        setPosts(postsCopy);
      })
      .catch((err) => console.error("Cannot set vote: ", err));
  };

  return loading ? (
    <Loading css={{ mt: "$10" }} />
  ) : (
    <Grid.Container gap={2}>
      {posts.length ? (
        posts.map((post, index) => (
          <Grid sm={12} key={index}>
            <Card isHoverable>
              <Card.Header>
                <User src={post.author.profile_photo} name={post.author.username}>
                  <User.Link href={`/p/${post.author.username}`}>@{post.author.username}</User.Link>
                </User>
              </Card.Header>
              <Card.Divider />
              <Card.Body css={{ py: "$10" }}>
                <ReactMarkdown children={post.content} />
              </Card.Body>
              <Card.Divider />
              <Card.Footer>
                <Row>
                  <Button
                    size="sm"
                    color="success"
                    auto
                    css={{ marginRight: "$3" }}
                    icon={<BiUpArrow />}
                    onPress={() => handleVotePost(post.id, "upvote", index)}
                    light={!post.is_upvoted}
                  >
                    {post.upvote_count}
                  </Button>
                  <Button
                    size="sm"
                    color="error"
                    auto
                    icon={<BiDownArrow />}
                    onPress={() => handleVotePost(post.id, "downvote", index)}
                    light={!post.is_downvoted}
                  >
                    {post.downvote_count}
                  </Button>
                </Row>
                {post.author.username === userData?.username && (
                  <Row justify="flex-end">
                    <Button color="error" light auto icon={<FiTrash />} onPress={() => setVisibleDeleteModal(post.id)} />
                  </Row>
                )}
              </Card.Footer>
            </Card>
          </Grid>
        ))
      ) : (
        <Text className="text-center" css={{ mt: "$10" }}>
          Follow{" "}
          <Text b color="primary">
            new people
          </Text>{" "}
          to see their posts
        </Text>
      )}
      <DeletePostModal visible={visibleDeleteModal !== 0} closeHandler={() => setVisibleDeleteModal(0)} id={visibleDeleteModal} />
    </Grid.Container>
  );
}
