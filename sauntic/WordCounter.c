#include <stdio.h>
int main()
{
	//Integer to keep track of the words
    int wordCount;
	//Character array for the user input (1000 character limit)
    char stringInput[100];
	
	//Prompt for user
    printf("Enter a sentence: ");  
    
	//Get the characters typed by the user
    gets(stringInput);
       
	//Check that the first character is not NULL and is not a space. If true add one to the word count
    if(stringInput[0] != NULL && stringInput[0] != ' '){
       wordCount++;
     }
      
	//Repeat for loop for the lenght of the string input
	  for(int i=0; i<100; i++){
		  //Check if any of the characters is a space
          if(stringInput[i] == ' ')
		  //If a character is a space check that the next character is not NULL or a space then add one to the word count
            if (stringInput [i + 1] != NULL && stringInput [i + 1] != ' ') {
				wordCount++;
			} 
         }  
    //Print the number of words the user wrote
    printf("You wrote %d words!", wordCount);
    
    return wordCount;
}