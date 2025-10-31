const textSlice = (text: string | undefined) => {
    if( text && text.length > 20 ){
        return text.slice(0, 20) + '…' ;
    }
    return text;
}

export default textSlice;
