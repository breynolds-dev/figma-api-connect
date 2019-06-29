import axios from "axios";

export class Figma {
  constructor( { accessToken = "", apiRoot = "", } ) {
    const headers = {
      "X-FIGMA-TOKEN": accessToken
    };

    const client = axios.create( {
      baseURL: `https://${apiRoot || "api.figma.com"}/v1/`,
      headers
    } );

    return {
      client,
      file: ( fileId, params = {} ) => client.get( `files/${fileId}`, { params } ),
      fileImages: ( fileId, params ) =>
        client.get( `images/${fileId}`, {
          params: {
            ...params,
            ids: params.ids.join( "," )
          }
        } ),
      comments: ( fileId ) => client.get( `files/${fileId}/comments` ),
      postComment: ( fileId, params ) =>
        client.post( `files/${fileId}/comments`, params ),
      teamProjects: ( teamId ) => client.get( `teams/${teamId}/projects` ),
      projectFiles: ( projectId ) => client.get( `projects/${projectId}/files` )
    };
  }
}