export type Book = {
    id: string;
    volumeInfo: {
        title: string,
        description?: string,
        imageLinks?: {
            thumbnail?: string,
            smallThumbnail?: string
        },
        previewLink: string
    }
  }