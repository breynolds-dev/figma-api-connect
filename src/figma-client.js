import axios from "axios";

export class FigmaClient {
  constructor( { accessToken = "", apiRoot = "", } ) {
    let headers = {
      "X-FIGMA-TOKEN": accessToken
    };

    this.client = axios.create( {
      baseURL: `https://${apiRoot || "api.figma.com"}/v1/`,
      headers
    } );
  }

  file( fileId, params = {} ) {
    this.client.get( `files/${fileId}`, { params } );
  }

  fileImages( fileId, params ) {
    this.client.get( `images/${fileId}`, {
      params: {
        ...params,
        ids: params.ids.join( "," )
      }
    } );
  }

  comments( fileId ) {
    this.client.get( `files/${fileId}/comments` );
  }

  postComment( fileId, params ) {
    this.client.post( `files/${fileId}/comments`, params );
  }

  teamProjects( teamId ) {
    this.client.get( `teams/${teamId}/projects` );
  }

  projectFiles( projectId ) {
    this.client.get( `projects/${projectId}/files` );
  }
}

export default FigmaClient;