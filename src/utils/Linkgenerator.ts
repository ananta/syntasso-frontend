interface ISocialLink {
  social: 'facebook' | 'twitter';
  path: string;
}

function Linkgenerator(linkType: ISocialLink) {
  const { social, path } = linkType;
  switch (social) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${path}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${path}&text=Found%20an%20awesome%20problem%20to%20solve%20in%20Syntasso.io`;
    default:
      return;
  }
}

export default Linkgenerator;
