import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<Queries.SiteMetadataQueryQuery>(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return site?.siteMetadata;
};
