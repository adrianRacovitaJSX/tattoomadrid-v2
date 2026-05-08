import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId, studioUrl } from './sanity/env';
import { schema } from './sanity/schemaTypes';

export default defineConfig({
  name: 'tattoomadrid',
  title: 'Saints & Sinners — CMS',
  basePath: studioUrl,
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Posts del blog')
              .child(
                S.documentTypeList('post')
                  .title('Posts')
                  .defaultOrdering([
                    { field: 'publishedAt', direction: 'desc' },
                  ])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'post'
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
