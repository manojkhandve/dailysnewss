import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
      if (!res.ok) throw new Error('Failed to fetch post data');
      const data = await res.json();
      setPost(data.posts[0]);
    } catch (err) {
      setError(true);
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const res = await fetch(`/api/post/getposts?limit=3`);
      if (!res.ok) throw new Error('Failed to fetch recent posts');
      const data = await res.json();
      setRecentPosts(data.posts);
    } catch (err) {
      console.error('Error fetching recent posts:', err);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: `Check out this post: ${post.title}`,
      url: `${window.location.origin}/post/${post.slug}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('Post shared successfully');
      } catch (err) {
        console.error('Error sharing the post:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard');
      } catch (err) {
        console.error('Failed to copy the link:', err);
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-red-500'>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post?.title}
      </h1>
      <div className='flex justify-center gap-4 mt-5'>
        <Link to={`/search?category=${post?.category}`} className='self-center'>
          <Button color='gray' pill size='xs'>
            {post?.category}
          </Button>
        </Link>
        <span className='self-center text-sm text-gray-500'>
          {post?.views} views
        </span>
      </div>
      <button onClick={handleShare} className='bg-blue-500 text-white p-2 rounded mt-4'>
        Share
      </button>
      <img
        src={post?.image}
        alt={post?.title}
        className='mt-8 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {(post?.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <CommentSection postId={post?._id} />
      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts?.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
