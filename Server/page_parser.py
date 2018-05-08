from bs4 import BeautifulSoup
from Naked.toolshed.shell import execute_js, muterun_js
import shutil
 
html_doc = open("response.html",'r')





# tmp = open("tmp.html", 'w')
# shutil.copyfile("response.html", "tmp.html")







soup = BeautifulSoup(html_doc, 'html.parser')
html_doc_string = soup.prettify();
script = soup.findAll('script')
for each in script:
	if(each.has_attr('src')):
		continue
	else:
		temp_code_file = open('temp_code_file.txt','w+')
		temp_code_file.write(str(each.string))
		temp_code_file.close()
		response = execute_js('code_optimizer.js','temp_code_file.txt')	
		optimized_code = open('temp_code_file.txt','r')
		each.string = optimized_code.read()
		optimized_code.close()
		html_doc_string = soup.prettify()






# tmp2 = open("tmp2.html", 'w')
# tmp2.write(html_doc_string.encode('utf-8'))






html_doc.close()
html_doc = open("response.html",'w')
html_doc.write(html_doc_string.encode('utf-8'))
html_doc.close()
