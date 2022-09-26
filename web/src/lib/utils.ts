export function getIconName(fileType: string): string {
    let type = fileType
    
    switch (type) {
        case 'video/mp4':
            return 'icon-video_player_'
        case 'audio/mp3':
            return 'icon_audio_player'
        case 'image/jpeg':
            return 'icon-tupian'
        case 'application/pdf':
            return 'icon-pdf'
    }
    return 'icon-documents'
}