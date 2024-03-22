import data from '../assets/data.json'
export function getLocalComments () {
    
    const existingComments = localStorage.getItem('comments');
    
    if(!existingComments){
        localStorage.setItem('comments',JSON.stringify(data));
        return JSON.parse(data);
    }

    return JSON.parse(existingComments);

}

export function setLocalComments (comments) {
    localStorage.setItem('comments',comments);
    return comments;
}
