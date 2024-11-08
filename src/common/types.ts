export type YoutubeItemType = {
    kind: string;
    etag: string;
    id: string;
    snippet: {
        customUrl: string;
        publishedAt: string;
        channelId: string | undefined;
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            high: {
                url: string;
                width: number;
                height: number;
            };
            standard: {
                url: string;
                width: number;
                height: number;
            };
            maxres: {
                url: string;
                width: number;
                height: number;
            };
        };
        channelTitle: string;
        tags: string[];
        categoryId: string;
        liveBroadcastContent: string;
        localized: {
            title: string;
            description: string;
        };
        defaultAudioLanguage: string;
    };
    contentDetails: {
        duration: string;
        dimension: string;
        definition: string;
        caption: string;
        licensedContent: boolean;
        contentRating: string;
        projection: string;
    };
    statistics: {
        viewCount: string;
        likeCount: string;
        favoriteCount: string;
        commentCount: string | undefined;
        subscriberCount: string;
    };
};
export type YoutubeResponseType = {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YoutubeItemType[];
};
export type ChannelListType = {
    kind: string;
    etag: string;
    id: string;
    snippet: {
        country: string;
        customUrl: string;
        description: string;
        localized: {
            title: string;
            description: string;
        };
        publishedAt: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            high: {
                url: string;
                width: number;
                height: number;
            };
        };
        title: string;
    };
    statistics: {
        hiddenSubscriberCount: boolean;
        subscriberCount: string;
        videoCount: string;
        viewCount: string;
    };
};
export type ChannelDetailType = {
    etag: string;
    kind: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: ChannelListType[];
};
export type VideoType = {
    etag: string;
    id: string;
    kind: string;
    contentDetails: {
        caption: boolean;
        efinition: string;
        dimension: string;
        duration: string;
        licensedContent: boolean;
        projection: string;
    };
    snippet: {
        ategoryId: string;
        channelId: string;
        channelTitle: string;
        defaultAudioLanguage: string;
        description: string;
        liveBroadcastContent: string;
        publishedAt: string;
        localized: {
            description: string;
            title: string;
        };
        tags: string[];
        title: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            high: {
                url: string;
                width: number;
                height: number;
            };
            standard: {
                url: string;
                width: number;
                height: number;
            };
            maxres: {
                url: string;
                width: number;
                height: number;
            };
        };
    };
    statistics: {
        commentCount: string;
        dislikeCount: string;
        favoriteCount: string;
        likeCount: string;
        viewCount: string;
    };
};
export type ChannelType = {
    kind: string;
    etag: string;
    id: string;
    snippet: {
        title: string;
        description: string;
        customUrl: string;
        publishedAt: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            high: {
                url: string;
                width: number;
                height: number;
            };
        };
        localized: {
            title: string;
            description: string;
        };
        country: string;
    };
    statistics: {
        viewCount: string;
        subscriberCount: string;
        hiddenSubscriberCount: boolean;
        videoCount: string;
    };
};
export type TopCommentType = {
    id: string;
    snippet: {
        channelId?: string;
        topLevelComment: CommentType;

        totalReplyCount: number;
    };
    replies?: {
        comments: CommentType[];
    };
};
export type CommentType = {
    id?: string;
    snippet: {
        channelId?: string;
        textOriginal: string;
        authorDisplayName: string;
        authorProfileImageUrl: string;
        authorChannelId?: {
            value: string;
        };
        likeCount: number;
        publishedAt: string;
        updatedAt?: string;
    };
};
export type RelatedItemType = {
    kind: string;
    etag: string;
    id: {
        videoId: string;
    };
    snippet: {
        customUrl: string;
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            high: {
                url: string;
                width: number;
                height: number;
            };
            standard: {
                url: string;
                width: number;
                height: number;
            };
            maxres: {
                url: string;
                width: number;
                height: number;
            };
        };
        channelTitle: string;
        tags: string[];
        categoryId: string;
        liveBroadcastContent: string;
        localized: {
            title: string;
            description: string;
        };
        defaultAudioLanguage: string;
    };
    contentDetails: {
        duration: string;
        dimension: string;
        definition: string;
        caption: string;
        licensedContent: boolean;
        contentRating: string;
        projection: string;
    };
    statistics: {
        viewCount: string;
        likeCount: string;
        favoriteCount: string;
        commentCount: string;
    };
};
export type RelatedResponseType = {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: RelatedItemType[];
};
export type ChannelDetailPage = {
    id: string;
    brandingSettings: {
        image: {
            bannerExternalUrl: string;
        };
    };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            high: {
                url: string;
            };
        };
        customUrl: string;
    };
    statistics: {
        subscriberCount: string;
        videoCount: string;
    };
};
export type channelDetailResponse = {
    items: ChannelDetailPage[];
};
export type SearchPlayListItemType = {
    id: string;
    snippet: {
        title: string;
        publishedAt: string;
        channelTitle: string;
        position: string;
        resourceId: {
            videoId: string;
        };
        thumbnails: {
            medium: {
                url: string;
            };
        };
    };
};
export type SearchPlayListResponse = {
    items: SearchPlayListItemType[];
};
export type HomePlayListItemType = {
    id: string;
    snippet: {
        title: string;
        resourceId: {
            videoId: string;
        };
    };
};
export type HomePlayListResponse = { items: HomePlayListItemType[] };
export type SearchVideoItemType = {
    etag: string;
    id: {
        videoId: string;
    };
    snippet: {
        thumbnails: {
            high: {
                url: string;
            };
        };
        title: string;
        channelTitle: string;
        publishedAt: string;
        description: string;
    };
};
export type SubscriptionsItemType = {
    id: string;
    snippet: {
        title: string;
        thumbnails: {
            medium: {
                url: string;
            };
        };
        resourceId: {
            channelId: string;
        };
    };
};

