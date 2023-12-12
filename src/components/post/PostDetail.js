import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPostDetailsAction, clearPostDetails } from '../../reduxstore/actions';
import NavBar from '../common/NavBar';
import { Box, Skeleton, Card, CardContent, Typography, Link } from '@mui/material';
import { timeDifference } from '../../utils/utility';

function decodeHTMLEntities(text) {
  const decodedElement = document.createElement('textarea');
  decodedElement.innerHTML = text;
  return decodedElement.value;
}

const Comment = ({ comment }) => {
  const [showChildren, setShowChildren] = useState(false);

  const toggleShowChildren = () => {
    setShowChildren(!showChildren);
  };

  const decodedText = decodeHTMLEntities(comment.text);

  return (
    <Card variant="outlined" style={{ marginBottom: '10px', marginTop: '5px', borderRadius: '10px' }}>
      <CardContent style={{ paddingLeft: `${comment.depth * 20}px`, paddingBottom: '10px' }}>
        <Typography variant="body1" component="div" textAlign={'left'}>
          <Box fontWeight="fontWeightBold">{comment.author} • {timeDifference(comment.created_at_i)}</Box>
        </Typography>
        <Typography variant="body1" textAlign={'left'} dangerouslySetInnerHTML={{ __html: decodedText }}></Typography>
        {comment.children && comment.children.length > 0 && (
          <Box textAlign={'left'}>
            <Link component="button" variant="body2" onClick={toggleShowChildren}>
              {showChildren ? 'Hide comments' : `Show ${comment.children.length} comments`}
            </Link>
            {showChildren &&
              comment.children.slice(0).reverse().map((child) => (
                <Comment key={child.id} comment={child} />
              ))
            }
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const postDetails = useSelector((state) => state.postDetails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(clearPostDetails());
    dispatch(fetchPostDetailsAction(postId))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));

    return () => {
      dispatch(clearPostDetails());
    };
  }, [dispatch, postId]);

  return (
    <Box sx={{ height: '100vh'}}>
      <NavBar />
      <Box style={{padding: '1.75rem', borderRadius: '10px', backgroundColor: 'aliceblue'  }}>
        {loading ? (
          Array.from({ length: 10 }, (_, index) => (
            <Card variant="outlined" style={{ marginBottom: '10px', marginTop: '5px', borderRadius: '10px' }}>
              <Skeleton variant="rectangular" width="100%" height={100} />
          </Card>
            ))
        ) : (
          <Box>
            <Typography variant="h4" gutterBottom textAlign={'left'}>
              {postDetails.title}
            </Typography>
            <Typography variant="body1" textAlign={'left'}>
              {postDetails.points} points by {postDetails.author} • {timeDifference(postDetails.created_at_i)} • {postDetails.type} • {postDetails.children.length} comments
            </Typography>
            <Box style={{ marginTop: '10px' }}>
            {postDetails.children && postDetails.children.slice(0).reverse().map((comment, index) => (
                <Comment key={comment.id} comment={{ ...comment, depth: 1 }} />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PostDetail;
