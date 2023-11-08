import Category from '../../graphql/types/category';
import Post from '../../graphql/types/post';

// I could create a separate 404 component, and that might be the more reasonable
// approach... I have an entire system set up to render Markdown posts, though, so
// I figured I'd just take advantage of it!
const fourOhFour: Partial<Post> | Partial<Category> = {
  title: '404 | Page not found',
  subtitle: 'I can solve a lot of problems, but this might not be one of them.',
  markdown:
    "The page you're looking for could not be found. I haul code fast, but I couldn't\n" +
    'put something here quite _that_ fast.\n' +
    '\n' +
    'You can:\n' +
    ' - Use the navbar at the top to look for where you wanted to go,\n' +
    ' - Start from [my landing page](/),\n' +
    ' - [Contact me](/contact) if something seems wrong,\n' +
    ' - Or enjoy this picture of my cats, Leroy and Jasper:\n' +
    '\n' +
    '![They are very good bois](/images/cats.jpg)',
};

export default fourOhFour;
