import * as Config from "./config";
import { Post, postSchema } from "./models/Post";
import { Comment, commentSchema } from "./models/Comment";
import { Album, albumSchema } from "./models/Album";
import { User, userSchema } from "./models/User";
import { Photo, photoSchema } from "./models/Photo";
import { toQueryString } from "./utils/queryString";
import { parseError } from "./error";

export interface APIClient {
    fetchPosts(cursor: number, limit: number): Promise<Post[]>;
    fetchPostsOfUser(userId: number): Promise<Post[]>;
    fetchComments(postId: number): Promise<Comment[]>;
    fetchAlbums(cursor: number, limit: number): Promise<Album[]>;
    fetchAlbumsOfUser(userId: number): Promise<Album[]>;
    fetchPhotos(
        albumId: number,
        cursor: number,
        limit: number
    ): Promise<Photo[]>;
    fetchUser(userId: number): Promise<User>;
}

async function _getAPI(
    path: string,
    params?: { [key: string]: any }
): Promise<{ [key: string]: string }[]> {
    let url = `${Config.API_ENDPOINT}/${path}`;
    if (params) {
        url += "?" + toQueryString(params);
    }
    return fetch(url).then(res => res.json());
}

export class SocialAppAPIClient implements APIClient {
    async fetchPosts(cursor: number, limit: number): Promise<Post[]> {
        try {
            const res = await _getAPI("posts", {
                _start: cursor,
                _limit: limit
            });
            return Promise.all(res.map(r => postSchema.validate(r)));
        } catch (e) {
            throw parseError(e);
        }
    }

    async fetchPostsOfUser(userId: number): Promise<Post[]> {
        try {
            const res = await _getAPI("posts", { userId });
            return Promise.all(res.map(r => postSchema.validate(r)));
        } catch (e) {
            throw parseError(e);
        }
    }

    async fetchComments(postId: number): Promise<Comment[]> {
        try {
            const res = await _getAPI("comments", { postId });
            return Promise.all(res.map(r => commentSchema.validate(r)));
        } catch (e) {
            throw parseError(e);
        }
    }

    async fetchAlbums(cursor: number, limit: number): Promise<Album[]> {
        try {
            const res = await _getAPI("albums", {
                _start: cursor,
                _limit: limit
            });
            const previews = (await Promise.all(
                res.map(a =>
                    _getAPI("photos", {
                        albumId: a.id,
                        _start: 0,
                        _limit: 1
                    })
                )
            )).map(p => p[0]);
            const resultsWithPreview = res.map((a, i) => ({
                ...a,
                preview: previews[i]
            }));
            return Promise.all(
                resultsWithPreview.map(r => albumSchema.validate(r))
            );
        } catch (e) {
            throw parseError(e);
        }
    }

    async fetchAlbumsOfUser(userId: number): Promise<Album[]> {
        try {
            const res = await _getAPI("albums", { userId });
            return Promise.all(res.map(r => albumSchema.validate(r)));
        } catch (e) {
            throw parseError(e);
        }
    }

    async fetchPhotos(
        albumId: number,
        cursor: number,
        limit: number
    ): Promise<Photo[]> {
        try {
            const res = await _getAPI("photos", {
                albumId,
                _start: cursor,
                _limit: limit
            });
            return Promise.all(res.map(r => photoSchema.validate(r)));
        } catch (e) {
            throw parseError(e);
        }
    }

    async fetchUser(userId: number): Promise<User> {
        try {
            const res = await _getAPI("users", { id: userId });
            return userSchema.validate(res[0]);
        } catch (e) {
            throw parseError(e);
        }
    }
}
