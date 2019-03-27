# vuessrtest
vue 服务端渲染，根据官方vue-hackernews-2.0-master 案例整理（官方案例中请求远程数据需要翻墙，国外网站否则打不开页面），利于以后项目搭建

远程API定义如下：采用spring mvc实现API 
1、Model定义
package com.hongying.model;

import java.io.Serializable;
public class Person implements Serializable {
    private int id;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getAge() {
        return age;
    }
    public void setAge(Integer age) {
        this.age = age;
    }
    public int getBirthday() {
        return birthday;
    }
    public void setBirthday(int birthday) {
        this.birthday = birthday;
    }
    private String name;
    private Integer age;
    private int birthday;
}

2、过滤器 解决服务端跨域请求
package com.hongying;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
public class CorsFilter implements javax.servlet.Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }
    @Override
    public void doFilter(ServletRequest request, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
        System.out.println("============CorsFilter.doFilter=========");
        HttpServletResponse response = (HttpServletResponse) resp;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with,Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        chain.doFilter((HttpServletRequest)request, response);
    }

    @Override
    public void destroy() {
    }
}
2.2、web.xml 配置过滤器
<filter>
        <filter-name>cors</filter-name>
        <filter-class>com.hongying.CorsFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>cors</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

3、API 控制器
package com.hongying;
import com.hongying.model.Person;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/person")
public class PersonController {
    private List<Person> lst=new LinkedList<>();
    public PersonController(){
        for (int i=0;i<10;i++){
            Person p=new Person();
            p.setId(i);
            p.setAge(i+new Random().nextInt(10));
            p.setBirthday(new Random().nextInt(5)+i);
            p.setName("jake"+i);
            lst.add(p);
        }
        System.out.println(lst.toString());
    }
    @RequestMapping("/getList")
    public List<Person> getLst(){
        System.out.println("客户端请求列表数据....");
        return lst;
    }
    @RequestMapping("/getPersonById")
    public Person getPersonById(String id){
        Person p=null;
        if(lst!=null){
            p=lst.get(Integer.parseInt(id));
        }
        System.out.println("请求详情信息。。。。"+id+"--结果："+p.getId());
        return p;
    }
}

