# 模型制作

本目录的两个 Blender 工程与六份 Python 脚本取自 [RhineLabUI 固定提交](https://github.com/LBEILC/RhineLabUI/tree/12cc5e4013acb9408f753ff71de6b8492299b7c8/art)，使用上游 [MIT 许可](../LICENSE)。

| 文件 | 用途 |
| --- | --- |
| `rhine-archive.blend`、`archive-assembly.blend` | 基础档案盒与六组可拆解结构的场景工程 |
| `build_archive.py` | 生成基础模型、`public/assets/archive-cassette.glb` 与基础工程 |
| `build_assembly.py` | 复用基础建模代码，生成 `public/assets/archive-assembly.glb` 与拆解工程 |
| `clear_reference_details.py`、`internal_architecture.py`、`shell_reference_details.py` | 由建模入口读取的双环内构、连接带与外壳细节 |
| `setup_studio.py` | 配置模型审阅灯光与相机 |

在仓库外准备制作目录，将本目录复制为 `<制作目录>/art/`，创建同级的 `public/assets/`。在制作目录使用安装好的 Blender 运行：

```bash
blender --background --factory-startup --python art/build_archive.py
blender --background --factory-startup --python art/build_assembly.py
```

两个命令分别写出 GLB 与同名场景工程。`build_assembly.py` 自动执行基础模型和细节脚本。直接编辑场景时，用 Blender 打开对应 `.blend`；运行资源保存在本案例 `film/app/assets/`。
