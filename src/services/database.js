class DataBaseMockService {
    
    restore(key) {
        return JSON.parse(localStorage.getItem(key)); 
    }

    update(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

}

export default DataBaseMockService; 