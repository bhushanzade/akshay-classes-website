jQuery(document).ready(function ($) {
  $('#computerFundamentalContent').click((event) => {
    $('html').css('overflow', 'hidden');
    $('#bootstrapModalRight').modal('show');
    $('#bootstrapModalLabel').text("Computer Fundamental");
    const data = [
      "Introduction",
      "X86 Tool Chains and its Components",
      "Working of preprocessor",
      "Working of compiler",
      "Phases of compiler",
      "Working of assembler",
      "Working of linker",
      "Working of loader",
    ];
    const ul = $('<ul>');
    data.forEach(item => {
      $('<li>').text(item).appendTo(ul);
    });
    $('#bootstrapModalBody').empty().append(ul);
  });


  $('#cContent').click((event) => {
    $('html').css('overflow', 'hidden');
    $('#bootstrapModalRight').modal('show');
    $('#bootstrapModalLabel').text("C programming");
    const data = [
      "History of C language",
      "Storage classes",
      "Auto storage class",
      "Register storage class",
      "Static storage class",
      "Extern storage class",
      "Scope of variable",
      "Lifetime of variable",
      "Linkage and its types",
      "Data Types",
      "Array in C",
      "Types of array",
      "Memory representation of array",
      "Character array and string",
      "Dynamic memory allocation techniques",
      "Internal flow of dynamic memory allocations",
      "Dynamic memory allocation functions",
      "Library functions applicable on memory",
      "Dynamic memory allocations on array (1D, 2D, 3D)",
      "Structure and Union",
      "Memory layout of Structure and Union",
      "Enumeration",
      "Use of Enumeration constant",
    ];
    const ul = $('<ul>');
    data.forEach(item => {
      $('<li>').text(item).appendTo(ul);
    });
    $('#bootstrapModalBody').empty().append(ul);
  })


  $('#advCContent').click((event) => {
    $('html').css('overflow', 'hidden');
    $('#bootstrapModalRight').modal('show');
    $('#bootstrapModalLabel').text("Advanced C programming");
    const data = [
      "Pointer",
      "Memory layout of pointers",
      "Types of pointer",
      "Pointer arithmetic",
      "Operations on void pointer",
      "Null pointer and Dangling pointer",
      "Function pointers",
      "Pointer to array and array to pointer",
      "C Preprocessor",
      "Macro expansion",
      "Types of macros",
      "Header files contents and its inclusion",
      "Conditional compilation techniques",
      "Tokenization process",
      "Writing user defined functions",
      "Working of user stack",
      "Contents of stack frame",
      "Function calling techniques",
      "Call by value technique",
      "Call by address technique",
      "Function returning mechanism",
      "Return by value technique",
      "Return by address technique",
      "Padding and memory alignment",
      "Contents inside structure and union",
      "Pragma directives",
      "Bit-field use in structure",
      "Exception handling in C",
    ];
    const ul = $('<ul>');
    data.forEach(item => {
      $('<li>').text(item).appendTo(ul);
    });
    $('#bootstrapModalBody').empty().append(ul);
  })

  $('#cppContent').click((event) => {
    $('html').css('overflow', 'hidden');
    $('#bootstrapModalRight').modal('show');
    $('#bootstrapModalLabel').text("C++ programming");
    const data = [
      "History of C++ language",
      "Data types",
      "Access specifier",
      "Reference",
      "Function calling technique",
      "Call by reference",
      "Dynamic memory allocation",
      "Constructor and Destructor",
      "Default argument",
      "Static concept",
      "Static local variable",
      "Static global variable",
      "Static characteristic",
      "Static behavior",
      "Difference between malloc and new",
      "Difference between free and delete",
      "Inheritance",
      "Types of inheritance according to Hierarchy",
      "Single level inheritance",
      "Multilevel inheritance",
      "Multiple inheritance",
      "Types of inheritance according to Access specifier",
      "Constant in C++",
      "Constant local variable",
      "Constant global variable",
      "Constant input argument of function",
      "Constant characteristic of class",
      "Constant behavior of class",
      "Constant object of class",
      "Polymorphism",
      "Function overloading",
      "Operator overloading",
      "Virtual function",
      "Friend in C++",
      "Naked friend function",
      "Friend function",
      "Friend class",
      "Namespace",
    ];
    const ul = $('<ul>');
    data.forEach(item => {
      $('<li>').text(item).appendTo(ul);
    });
    $('#bootstrapModalBody').empty().append(ul);
  })

  $('#advCppprogramming').click((event) => {
    $('html').css('overflow', 'hidden');
    $('#bootstrapModalRight').modal('show');
    $('#bootstrapModalLabel').text("Advanced C++ programming");
    const data = [
      "Inline function",
      "This pointer",
      "Member initialization list",
      "Up casting",
      "Down casting",
      "Pure Virtual function",
      "Virtual destructor",
      "Pure Virtual destructor",
      "Shallow copy",
      "Deep copy",
      "New handler",
      "Run Time Type Identification (RTTI)",
      "Generic programming",
      "Function template",
      "Singleton class",
      "Class template",
      "Standard Template Library (STL)",
      "Array",
      "Vector",
      "Set, Multiset",
      "Map, Multi-map",
      "Type cast",
      "Static cast",
      "Const cast",
      "Dynamic cast",
      "Reinterpret cast",
      "Smart Pointers",
      "Auto pointer",
      "Unique pointer",
      "Shared pointer",
      "Weak pointer",
    ];
    const ul = $('<ul>');
    data.forEach(item => {
      $('<li>').text(item).appendTo(ul);
    });
    $('#bootstrapModalBody').empty().append(ul);
  })

  $('#dataStructureContent').click((event) => {
    $('html').css('overflow', 'hidden');
    $('#bootstrapModalRight').modal('show');
    $('#bootstrapModalLabel').text("Data Structure");
    const data = [
      "Linked List",
      "Singly Linked List",
      "Doubly Linked List",
      "Singly Circular Linked List",
      "Doubly Circular Linked List",
      "Stack",
      "Stack using static memory allocation",
      "Stack using dynamic memory allocation",
      "Queue",
      "Linear queue",
      "Circular Queue",
      "Doubly Ended Queue",
      "Priority Queue",
      "Tree",
      "Binary Search Tree",
      "Pre-order",
      "In-order",
      "Post-order",
    ];
    const ul = $('<ul>');
    data.forEach(item => {
      $('<li>').text(item).appendTo(ul);
    });
    $('#bootstrapModalBody').empty().append(ul);
  })

  $('#programmingContent').click((event) => {
    $('html').css('overflow', 'hidden');
    $('#bootstrapModalRight').modal('show');
    $('#bootstrapModalLabel').text("Programming");
    const data = [
      "Programs on Number",
      "Programs on Array using static memory allocation",
      "Programs on Passing Array to Function",
      "Programs on Array using dynamic memory allocation",
      "Programs on Digit",
      "Programs on Bit",
      "Programs on String",
      "Programs on Recursion",
      "Programs on Structure",
      "Programs on Union",
      "Programs on Linked List",
    ];
    const ul = $('<ul>');
    data.forEach(item => {
      $('<li>').text(item).appendTo(ul);
    });
    $('#bootstrapModalBody').empty().append(ul);
  });


  $('#bootstrapModalRight').on('hidden.bs.modal', function (e) {
    $('html').css('overflow', '');
    // Additional actions you want to perform when modal is closed
  });
});