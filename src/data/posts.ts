export interface Post {
  id: string
  title: string
  date: string
  tags: string[]
  summary: string
  cover?: string
  content: string
  pinned?: boolean
}

// ============================================================
// 如何添加新文章：
// 在下面的数组里加一项即可，content 支持简单的 Markdown 语法：
//   ## 二级标题   ### 三级标题
//   ```代码块```
//   - 列表项
//   > 引用
//   **加粗**  `行内代码`  [链接文字](https://...)
// ============================================================

export const posts: Post[] = [
  {
    id: 'hello-blog',
    title: '为什么我要搭这个博客',
    date: '2026-07-23',
    tags: ['随笔', '心路历程'],
    pinned: true,
    summary: '记录的开始。关于写作、遗忘，以及为什么程序员都应该有一个自己的角落。',
    content: `
搭这个博客的想法其实很久了。每次调通一个 bug、推完一个公式，当下觉得"这辈子都忘不了"，两周后翻回自己的代码却像在读陌生人写的东西。

## 为什么要写

人的记忆是不可靠的，尤其是**程序性记忆**——你以为你掌握了，其实只是"刚才那段时间你掌握了"。写下来至少有三个好处：

- 把模糊的理解逼成清晰的表达，写不清楚的地方就是没懂的地方
- 给未来的自己留一份文档，省得重复踩坑
- 长期积累下来，能看到自己思维方式的演变轨迹

## 写什么

这个博客主要记录三类内容：

1. **技术笔记**：C++、嵌入式、数学建模中遇到的问题与解法
2. **学习心得**：课程学习、竞赛备战中的方法论
3. **随笔**：一些不成体系的思考

> "我写作不是为了记住，而是为了可以安心地忘记。"

## 这个博客本身

博客是用 React + TypeScript + Tailwind CSS 搭的静态站，文章数据集中在一个 \`posts.ts\` 文件里，加文章就像加一条数据。以后可能会迁移到带后端的架构，支持评论和动态更新——那是后话了。

先写起来，比什么都重要。
`,
  },
  {
    id: 'cpp-pointer-notes',
    title: 'C++ 指针与内存管理：我踩过的坑',
    date: '2026-07-18',
    tags: ['C++', '学习笔记'],
    summary: '指针不神秘，神秘的是"谁负责释放"。整理一下深复制、运算符重载和继承体系里的内存问题。',
    content: `
学 C++ 到现在，指针相关的 bug 占了我调试时间的一大半。这篇把最容易出错的几件事捋一遍。

## 深复制：Rule of Three

只要类里管理了裸指针，三件事必须成套出现：

\`\`\`cpp
class MyString {
    char* data;
public:
    MyString(const MyString& other) {              // 拷贝构造
        data = new char[strlen(other.data) + 1];
        strcpy(data, other.data);
    }
    MyString& operator=(const MyString& other) {   // 拷贝赋值
        if (this == &other) return *this;          // 自赋值检查！
        delete[] data;
        data = new char[strlen(other.data) + 1];
        strcpy(data, other.data);
        return *this;
    }
    ~MyString() { delete[] data; }                 // 析构
};
\`\`\`

漏掉任何一个，默认的浅复制就会让两个对象指向同一块内存，析构时 **double free**。

## 继承体系的坑

基类析构函数一定要声明成 \`virtual\`，否则通过基类指针删除派生类对象时，派生类的部分不会被析构——内存泄漏得不声不响。

\`\`\`cpp
class Base {
public:
    virtual ~Base() = default;  // 这个 virtual 救命
};
\`\`\`

## 我的总结

- 能用栈对象就别用堆，能用智能指针就别用裸 \`new\`
- \`operator=\` 永远先检查自赋值
- 文件流和二进制 IO 时注意对象生命周期，别返回局部变量的引用

指针的核心问题从来不是"怎么指向"，而是**"谁拥有这块内存，谁负责释放"**。想清楚所有权，90% 的问题就消失了。
`,
  },
  {
    id: 'mcmm-reflection',
    title: '数学建模复盘：差分进化调参的一些体会',
    date: '2026-07-15',
    tags: ['数学建模', '优化算法'],
    summary: 'DE 算法在板凳龙问题里的实战记录：参数怎么调、为什么 NumPy 向量化能快几十倍。',
    content: `
这次数模用了差分进化（DE）做参数优化，踩了不少坑，记录一下。

## DE 的参数直觉

差分进化就三个核心参数：

- **种群大小 NP**：一般取维度 D 的 5~10 倍，太小容易早熟收敛
- **缩放因子 F**：控制变异步长，0.5~0.8 比较稳；F 大则探索强、收敛慢
- **交叉概率 CR**：0.8~0.9 适合可分离问题，强耦合问题要降到 0.2 左右

一开始我 F 取了 0.9，跑了半天不收敛，以为模型错了，其实只是参数太激进。

## 向量化为什么快这么多

原来用 Python 循环遍历种群计算目标函数，100 代要跑十几分钟。改成 NumPy 一次性算整个种群矩阵：

\`\`\`python
# 原来：for i in range(NP): f[i] = objective(pop[i])
# 现在：
f = objective(pop)   # objective 内部全部用广播运算
\`\`\`

直接快了 **40 倍以上**。原因是 Python 的解释器开销全在循环上，而 NumPy 的广播是在 C 层面完成的。

## 一点方法论

优化算法本身很少是瓶颈，瓶颈往往是**目标函数写得对不对、快不快**。先把目标函数用已知解验证，再谈调参。

> 调参之前先验证，验证不过全是白调。
`,
  },
  {
    id: 'embedded-car-log',
    title: '嵌入式智能小车：从 Keil 到跑起来的第一周',
    date: '2026-07-10',
    tags: ['嵌入式', '项目日志'],
    summary: '智能小车项目第一阶段的记录：电机驱动、PID 雏形，以及一个玄学 bug 的真相。',
    content: `
电赛备战 + 智能小车项目，第一周主要是让车"能动且可控"。

## 电机与驱动

用的是经典的 TB6612 驱动，PWM 调速。第一个误区是 PWM 频率——开太低（几百 Hz）电机会啸叫，那是人耳可闻的开关频率，提到 **10kHz 以上** 就安静了。

## PID 雏形

先上了最简单的位置式 PID 做速度闭环：

\`\`\`c
float pid_update(PID* p, float target, float measure) {
    float err = target - measure;
    p->integral += err;
    // 积分限幅，防止积分饱和
    if (p->integral > I_MAX) p->integral = I_MAX;
    if (p->integral < -I_MAX) p->integral = -I_MAX;
    float out = p->kp * err + p->ki * p->integral
              + p->kd * (err - p->last_err);
    p->last_err = err;
    return out;
}
\`\`\`

## 那个玄学 bug

车偶尔会毫无征兆地重启。查了一天，最后发现是电机堵转瞬间电流拉爆了电源轨，单片机欠压复位。加上大电容和 TVS 之后世界清净了。

教训：**嵌入式系统里，软件查不出问题的时候，先怀疑电源。**
`,
  },
]

export const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)))
