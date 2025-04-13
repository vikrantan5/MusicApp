import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import Toast from './Toast';
import './Community.css';

const Community = () => {
  const { theme } = useContext(ThemeContext);
  const [postInput, setPostInput] = useState('');
  const [posts, setPosts] = useState([
    { id: 1, content: 'How do you manage stress for heart health?', replies: ['Meditation helps me a lot!'] },
  ]);
  const [webinarForm, setWebinarForm] = useState({ name: '', email: '' });

  const handlePostSubmit = () => {
    if (!postInput.trim()) {
      Toast('Please enter a post.', 'error');
      return;
    }
    setPosts([...posts, { id: posts.length + 1, content: postInput, replies: [] }]);
    setPostInput('');
    Toast('Post added!', 'success');
  };

  const handleReplySubmit = (postId, reply) => {
    if (!reply.trim()) {
      Toast('Please enter a reply.', 'error');
      return;
    }
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, replies: [...post.replies, reply] } : post
      )
    );
    Toast('Reply added!', 'success');
  };

  const handleWebinarSubmit = () => {
    if (!webinarForm.name || !webinarForm.email) {
      Toast('Please fill all fields.', 'error');
      return;
    }
    Toast('Registered for webinar!', 'success');
    setWebinarForm({ name: '', email: '' });
  };

  return (
    <motion.div
      className={`community ${theme}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2>Community Support</h2>
      <div className="forum">
        <h3>Forum</h3>
        <div className="post-input">
          <textarea
            placeholder="Share your thoughts..."
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
          />
          <motion.button
            onClick={handlePostSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Post
          </motion.button>
        </div>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="post"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p>{post.content}</p>
            <div className="replies">
              {post.replies.map((reply, index) => (
                <p key={index} className="reply">
                  {reply}
                </p>
              ))}
              <input
                type="text"
                placeholder="Write a reply..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleReplySubmit(post.id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="webinars">
        <h3>Upcoming Webinar</h3>
        <p>Cardiology Q&A - April 20, 2025</p>
        <form className="webinar-form">
          <label>
            Name:
            <input
              type="text"
              value={webinarForm.name}
              onChange={(e) => setWebinarForm({ ...webinarForm, name: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={webinarForm.email}
              onChange={(e) => setWebinarForm({ ...webinarForm, email: e.target.value })}
            />
          </label>
          <motion.button
            type="button"
            onClick={handleWebinarSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Community;