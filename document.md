####php 代码规范
``` php
  /**
  * 这里写类的说明，这个类主要的值做什么的，有什么用 
  */
  class className extends Base{
    /**
    * 私有全局类变量 g_nick
    * @var String 
    */
    private $g_nick = "全局名字";
  
  
  
    /**
    * @author chenlongke
    * @param $name string 姓名
    * @param $from string 来自哪里
    * @return String 合并后的字符串
    */
    public function merge($name,$from){
      //todo 
      return "my name is $name from $from; I like to eat foods";
    }
    
    
  }
```