from bs4 import BeautifulSoup

# soup = BeautifulSoup(open("test.html")) #35(?) textbooks
soup = BeautifulSoup(open("UCLA Store.html"))

# class='product'      - 57
# class='product alt'  - 46

# book = soup.find('tr', {'class':'product'})
# print book

books = soup.find_all('tr', {'class':'product'})
# books = soup.find_all('tr', {'class':'product alt'})

# print books
# print type(books)

for i, result in enumerate(books):
	print " "
	print " ***** RESULT #%i *****" % (i + 1)
	print " "
	print result

print ""
print "found %i books" % len(books)


# pull titles, prices (new & used), courses, author, ISBN, publisher, outofstock