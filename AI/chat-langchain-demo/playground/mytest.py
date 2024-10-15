item = {"title": "Python基础", "content": "这是内容"}

def test():
    test2(**item)

def test2(title, content):
    print(title, content)
    
if __name__ == "__main__":
    test()