# BuildYourCV

## 项目定位

一个开源的 CV 生成工具，基于 JSON Resume 标准。用户上传简历后，AI 解析为 JSON，用户选择模板和样式，一键导出专业 CV。

**域名**: buildyourcv.today  
**部署**: Vercel  
**技术栈**: Next.js + Tailwind CSS + TypeScript  
**开源**: 是

## 一套代码，两个入口

| 入口 | 域名 | 用途 |
|------|------|------|
| 独立站 | buildyourcv.today | 开源工具，免费引流 |
| 嵌入 | findyourjob.today/build | 付费流程最后一步 |

## 用户流程

```
上传 CV (PDF/Word/粘贴文本)
    ↓
调用 DeepSeek API 解析为 JSON Resume 格式
    ↓
选择模板 (Elegant/Kendall/Stackoverflow 等)
    ↓
定制样式 (颜色/字体/区块显隐)
    ↓
实时预览
    ↓
导出 PDF/HTML
```

## 技术栈

- **框架**: Next.js 14+ (App Router)
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **数据格式**: JSON Resume 标准 (jsonresume.org)
- **CV 解析**: DeepSeek API (服务端调用)
- **模板渲染**: React 组件
- **PDF 导出**: html2pdf.js 或 react-pdf
- **部署**: Vercel

## 项目结构

```
src/
├── app/
│   ├── api/
│   │   └── parse-cv/
│   │       └── route.ts        # DeepSeek API 调用，CV → JSON
│   ├── page.tsx                # 主页面
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Upload/
│   │   └── index.tsx           # 上传组件 (PDF/Word/粘贴文本)
│   ├── Editor/
│   │   └── index.tsx           # JSON 编辑器
│   ├── Preview/
│   │   └── index.tsx           # 实时预览容器
│   ├── Templates/
│   │   ├── Elegant.tsx
│   │   ├── Kendall.tsx
│   │   └── Stackoverflow.tsx
│   ├── Customizer/
│   │   └── index.tsx           # 样式定制面板
│   └── Export/
│       └── index.tsx           # 导出功能
├── utils/
│   ├── exportPDF.ts            # PDF 导出逻辑
│   └── jsonResumeSchema.ts     # JSON Resume 类型定义
└── types/
    └── resume.ts               # TypeScript 类型
```

## JSON Resume Schema

JSON Resume 是开源简历标准，核心结构：

```typescript
interface JsonResume {
  basics: {
    name: string;
    label?: string;
    email?: string;
    phone?: string;
    summary?: string;
    location?: {
      city?: string;
      countryCode?: string;
    };
    profiles?: Array<{
      network: string;
      url: string;
    }>;
  };
  work?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
  }>;
  education?: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate?: string;
  }>;
  skills?: Array<{
    name: string;
    keywords?: string[];
  }>;
  projects?: Array<{
    name: string;
    description?: string;
    highlights?: string[];
    url?: string;
  }>;
  awards?: Array<{
    title: string;
    awarder: string;
    date: string;
  }>;
  certificates?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  languages?: Array<{
    language: string;
    fluency: string;
  }>;
}
```

官方文档: https://jsonresume.org/schema/

## 核心功能

### 1. CV 解析 (`/api/parse-cv`)

用户输入:
- 上传 PDF
- 上传 Word (.docx)
- 粘贴纯文本

后端调用 DeepSeek API，返回 JSON Resume 格式数据。

```typescript
// POST /api/parse-cv
// Request: { content: string, type: 'pdf' | 'docx' | 'text' }
// Response: { data: JsonResume }
```

### 2. 模板选择

初期支持 3-5 个模板:
- **Elegant** - 卡片式，通用款
- **Kendall** - Bootstrap 风格，商务正式
- **Stackoverflow** - 开发者风格
- **Macchiato** - 极简设计感
- **Even** - 现代简洁

每个模板是一个 React 组件，接收 `JsonResume` 作为 props。

### 3. 区块控制

用户通过 checkbox 控制显示哪些区块：

| 区块 | 必选 |
|------|------|
| Work Experience | ✅ |
| Education | ✅ |
| Skills | ✅ |
| Projects | ❌ |
| Awards | ❌ |
| Certificates | ❌ |
| Languages | ❌ |

用户取消勾选 → 从 JSON 删除该字段 → 模板不渲染该区块

### 4. 样式定制

通过 CSS 变量实现：

```css
:root {
  --cv-primary-color: #2563eb;
  --cv-font-family: 'Inter', sans-serif;
  --cv-heading-size: 1.5rem;
  --cv-spacing: 1rem;
}
```

用户选择后，动态生成 style 标签注入页面。

### 5. 实时预览

用户修改任何内容（JSON/模板/样式），右侧立即更新预览。

### 6. 导出

- **PDF**: 使用 html2pdf.js 将预览区域转为 PDF
- **HTML**: 直接下载渲染后的 HTML
- **JSON**: 下载 JSON Resume 文件，方便下次导入

## 开发顺序

### Phase 1: 基础框架
1. 初始化 Next.js + Tailwind + TypeScript
2. 创建目录结构
3. 定义 JSON Resume TypeScript 类型

### Phase 2: 核心渲染
4. 创建 JSON 编辑器组件（textarea）
5. 创建第一个模板（Elegant）
6. 实现实时预览

### Phase 3: 导出功能
7. 实现 PDF 导出
8. 实现 HTML/JSON 下载

### Phase 4: AI 解析
9. 创建 `/api/parse-cv` 接口
10. 集成 DeepSeek API
11. 实现文件上传组件

### Phase 5: 扩展
12. 添加更多模板
13. 实现样式定制面板
14. 实现区块显隐控制

## 环境变量

```env
DEEPSEEK_API_KEY=your_api_key_here
```

在 Vercel Dashboard → Settings → Environment Variables 中配置。

## 注意事项

- 模板的网页结构不能改（2列就是2列）
- 区块显隐通过 JSON 字段控制，不是 CSS 隐藏
- 样式定制通过 CSS 变量实现
- 必选区块（Work/Education/Skills）不能取消勾选
- 不支持图片上传（用图片做 CV 的不是目标用户）
- API Key 必须在服务端调用，不能暴露给前端

## 相关资源

- JSON Resume 官网: https://jsonresume.org/
- JSON Resume Schema: https://github.com/jsonresume/resume-schema
- 主题预览: https://registry.jsonresume.org/thomasdavis?theme=elegant
- 社区主题: https://www.npmjs.com/search?q=jsonresume-theme
- DeepSeek API: https://platform.deepseek.com/

## 关联项目

- **findyourjob.today**: 付费 CV 分析工具，最后一步嵌入 buildyourcv
- **showyourprofile.com**: 个人作品展示网站
