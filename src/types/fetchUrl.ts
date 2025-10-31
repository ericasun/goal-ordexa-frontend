// 请求体

/**
 * Get请求
 * @param url 
 * @param setData 
 * @param message 
 */
export const fetchUrlGET = async (url:any , setData: any,  message: string) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      setData(data || []); 
    } else {
      console.error(data.message || message );
    }
  } catch (error) {
    console.error(error);
  } finally {
  }
}

/**
 * Post请求
 * @param url 
 * @param values 
 * @param messageApi
 * @param isMessage   是否提示
 */
export const fetchUrlPOST = async (
  url:string , 
  values?: any,
  messageApi?: any,
  isMessage: boolean = true, // 默认显示 message 提示
) => {
  try {    
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values || {}),
    });

    const data = await res.json();
    if (data.success) {
      if(isMessage){
        messageApi.success(data.message || "成功")
      }
      return data
    } else {
      if (process.env.NODE_ENV === "development") {
        
        console.error("接口错误：", data.message, data.error);
      } else {
        console.error("请求失败：", data.message || "未知错误");
      }
      messageApi.error(data.message || "网络错误，无法连接服务器");
    }
  } catch (error) {
    console.error(error);
    throw error; 
  } finally {
  }
}