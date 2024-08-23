import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function PostCard({ post }) {
  const navigate = useNavigate();

  const postUrl = `${window.location.origin}/post/${post.slug}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: `Check out this post: ${post.title}`,
          url: postUrl,
          // Image sharing via Web Share API might not be supported in all browsers
          // Use image URL directly if applicable
        });
        console.log('Post shared successfully');
      } catch (err) {
        console.error('Error sharing the post:', err);
        handleFallbackShare(); // Handle fallback if Web Share API fails
      }
    } else {
      handleFallbackShare(); // Handle fallback if Web Share API is not supported
    }
  };

  const handleFallbackShare = () => {
    const encodedUrl = encodeURIComponent(postUrl);
    const shareText = `Check out this post: ${post.title}`;
    const encodedText = encodeURIComponent(`${shareText}\n${postUrl}`);

    // Create share URLs for various platforms
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
    const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(shareText)}`;

    // Open a share menu
    // Example: open WhatsApp share URL
    window.open(whatsappUrl, '_blank'); 
    // You can open other URLs or show a share menu as needed
  };

  const incrementViewCount = async () => {
    try {
      await fetch(`/api/post/view/${post.slug}`, {
        method: 'GET',
      });
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  const handlePostClick = () => {
    incrementViewCount();
    navigate(`/post/${post.slug}`);
  };

  return (
    <div
      className='md:ml-20 group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'
      onClick={handlePostClick}
    >
      <img
        src={post.image}
        alt='post cover'
        className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'
      />
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>{post.category}</span>
        <button onClick={handleShare} className='bg-blue-500 text-white py-1 px-2 rounded'>
          Share
        </button>
        <Link
          to={`/post/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering handlePostClick when clicking the link
            incrementViewCount(); // Increment view count on link click
          }}
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
